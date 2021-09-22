import { MeterProvider } from '@opentelemetry/sdk-metrics-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ExpressInstrumentation } from 'opentelemetry-instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';


const init = function (serviceName: string, metricPort: number) {

    // Define metrics
    const metricExporter = new PrometheusExporter({ port: metricPort }, () => {
        console.log(`scrape: http://localhost:${metricPort}${PrometheusExporter.DEFAULT_OPTIONS.endpoint}`);
    });
    const meter = new MeterProvider({ exporter: metricExporter, interval: 1000 }).getMeter(serviceName);

    // Define traces
    const traceExporter = new JaegerExporter({ endpoint: 'http://localhost:14268/api/traces' });
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        })
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter))
    provider.register();
    registerInstrumentations({
        instrumentations: [
            new ExpressInstrumentation(),
            new HttpInstrumentation()
        ]
    });
    const tracer = provider.getTracer(serviceName);

    return { meter,tracer };
}

export default init;