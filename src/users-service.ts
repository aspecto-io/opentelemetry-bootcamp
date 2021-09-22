import init from './tracer';
init('users-services', 8091);

import * as api from '@opentelemetry/api';
import axios from 'axios';
import * as express from 'express';
const app = express();
const randomNumber = (min: number, max: number) => Math.floor(Math.random() * max + min);

app.get('/user', async (request, response) => {
    const apiResponse = await axios('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8');
    const randomIndex = randomNumber(0, apiResponse.data.length)
    const activeSpan = api.trace.getSpan(api.context.active());
    activeSpan.addEvent('A number was randomizaed', {
        randomIndex
    })

    response.json(apiResponse.data[randomIndex]);
})

app.listen(8090);
console.log('users services is up and running on port 8090');
