import init from './tracer';
const { meter, tracer } = init('items-service', 8081);

import * as api from '@opentelemetry/api';
import axios from 'axios';
import * as express from 'express';
import * as Redis from 'ioredis';
const redis = new Redis();

import * as WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:8092');


const app = express();
const httpCounter = meter.createCounter('http_calls');

app.use((request, response, next) => {
    httpCounter.add(1);
    next();
});

app.get('/ws', (req, res) => {
    const payload = { msg: 'Hi over ws' };
    // const wsSpan = tracer.startSpan('send ws message', {})
    // api.propagation.inject(api.trace.setSpan(api.context.active(), wsSpan), payload);
    // wsSpan.setAttribute('payload',JSON.stringify(payload))

    ws.send(JSON.stringify(payload));
    // wsSpan.end();
    res.json({ ws: true })
})

app.get('/data', async (request, response) => {
    try {
        if (request.query['fail']) {
            throw new Error('A really bad error :/')
        }
        const user = await axios.get('http://localhost:8090/user');
        response.json(user.data);
    } catch (e) {
        const activeSpan = api.trace.getSpan(api.context.active());
        console.error(`Critical error`, { traceId: activeSpan.spanContext().traceId });
        activeSpan.recordException(e);
        response.sendStatus(500);
    }
})


app.get('/pub', (request, response) => {
    const activeSpan = api.trace.getSpan(api.context.active());

    let payload = {
        message: 'this-is-my-message'
    };
    api.propagation.inject(api.trace.setSpan(api.context.active(), activeSpan), payload);

    redis.publish('my-channel', JSON.stringify(payload));
    response.sendStatus(200);
})

app.listen(8080);
console.log('items services is up and running on port 8080');


