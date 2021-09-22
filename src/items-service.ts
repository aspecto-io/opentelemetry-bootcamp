import init from './tracer';
const { meter } = init('items-service', 8081);

import * as api from '@opentelemetry/api';
import axios from 'axios';
import * as express from 'express';

const app = express();
const httpCounter = meter.createCounter('http_calls');

app.use((request, response, next) => {
    httpCounter.add(1);
    next();
});

app.get('/data', async (request, response) => {
    try {
        if(request.query['fail']){
            throw new Error('A really bad error :/')
        }
        const user = await axios.get('http://localhost:8090/user');
        response.json(user.data);
    } catch (e) {
        const activeSpan = api.trace.getSpan(api.context.active());
        console.error(`Critical error`, { traceId: activeSpan.spanContext().traceId});
        response.sendStatus(500);
    }
})

app.listen(8080);
console.log('items services is up and running on port 8080');


