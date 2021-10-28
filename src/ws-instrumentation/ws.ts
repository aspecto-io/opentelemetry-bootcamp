import { InstrumentationBase, InstrumentationModuleDefinition, InstrumentationNodeModuleDefinition, isWrapped } from "@opentelemetry/instrumentation";
import * as api from '@opentelemetry/api';

export default class WsInstrumentation extends InstrumentationBase<any> {

    constructor() {
        super('my-ws-instrumentation', '0.0.1');
    }

    protected init(): void | InstrumentationModuleDefinition<any> | InstrumentationModuleDefinition<any>[] {
        console.log(`ws init`)

        return [
            new InstrumentationNodeModuleDefinition<any>(
                'ws', ['*'],
                (moduleExports, moduleVersion) => {
                    const self = this;
                    console.log(`ws version :${moduleVersion}`)
                    console.log(`on :${moduleVersion}`, moduleExports.prototype.on)
                    console.log(`send :${moduleVersion}`, moduleExports.prototype.send)

                    this._wrap(moduleExports.prototype, 'on', (original) =>{
                        console.log(`on was called`);
                        return function(ev:any, originalListener: Function){
                            console.log(`on was register`, { ev, originalListener });
                            if(ev === "message"){
                                const wrapMessage = function (args){
                                    const payload = JSON.parse(args?.toString());
                                    const propagatedContext = api.propagation.extract(api.ROOT_CONTEXT, payload);
                                    const wsSpan = self.tracer.startSpan('got ws message', {
                                        attributes: {
                                            'payload': args?.toString()
                                        }
                                    }, propagatedContext)
                                    originalListener.apply(this, args)
                                    wsSpan.end();
                                }
                                // return wrapMessage
                                return original.apply(this, [ev, wrapMessage]);

                            }

                            return original.apply(this,[ev, originalListener]);


                        }
                    });

                    this._wrap(moduleExports.prototype, 'send', (original) => {
                        console.log(`Wrapping send methdo`);

                        return function (
                            data: any,
                            options: { mask?: boolean | undefined; binary?: boolean | undefined; compress?: boolean | undefined; fin?: boolean | undefined },
                            cb?: (err?: Error) => void) {
                                console.log(`ws.send is called`)

                                const sendSpan = self.tracer.startSpan('send ws message (custom)');
                                const payload = JSON.parse(data);
                                api.propagation.inject(api.trace.setSpan(api.context.active(), sendSpan), payload);
                                sendSpan.setAttribute('payload', JSON.stringify(payload));
                                const result = original.apply(this, [JSON.stringify(payload), options, cb]);
                                sendSpan.end();
                                return result;

                        }
                    })

                    return moduleExports;
                },
                (moduleExports) => { },
                []
            )
        ]

    }
}