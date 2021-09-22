# The OpenTelemetry bootcamp

Welcome to OpenTelemetry bootcamp!

This repo store all the resources and code demos there were presented at https://www.aspecto.io/opentelemetry-bootcamp/

You can find the bootcamp resources here:
 * Episode 1 - [slides](https://docs.google.com/presentation/d/1V9ByAsZkL2PcumSb0PrFSAAnc8Yizqa4QhVNP27xlr4/edit?usp=sharing) and [video recording](https://www.youtube.com/watch?v=UEwkn0iHDzA&ab_channel=Aspecto)


 To join the slack channel: https://app.slack.com/client/T08PSQ7BQ/C02D7BPU5U3


 #### Running to code

 Start by `docker-compose up`

 Then install all dependencies by running `yarn install`
 
 Spin up both services:
 * `yarn items`
 * `yarn users`


Send two API calls:
* `curl http://localhost:8080/data`
* `curl http://localhost:8080/data?fail=1`

#### View traces, logs and metrics:
* View the metrics in prometheus, go to http://localhost:9090 and search for "http_calls_total" - this will show you the count of API calls received by items-service

* To view the traces and logs go to http://localhost:16686/ 