# The OpenTelemetry bootcamp

Welcome to OpenTelemetry bootcamp!

This repo store all the resources and code demos there were presented at https://www.aspecto.io/opentelemetry-bootcamp/

You can find the bootcamp resources here:
 * Episode 1: Getting started with OpenTelemetry - [slides](https://docs.google.com/presentation/d/1V9ByAsZkL2PcumSb0PrFSAAnc8Yizqa4QhVNP27xlr4/edit?usp=sharing) and [video recording](https://www.youtube.com/watch?v=UEwkn0iHDzA&ab_channel=Aspecto)

* Episode 2: Integrating OpenTelemetry to your application - [slides](https://docs.google.com/presentation/d/18STZLN7xjjCjesF6IoC3aT9p7UcHIiTFAmVZWYILoKU/edit?usp=sharing) and [video recording](https://www.youtube.com/watch?v=nIWCmh0pOUM)

* Episode 3: Deploying the OpenTelemetry Stack - [slides](https://docs.google.com/presentation/d/1LbvF3uvmNXKNgCOdid5Ckttba-5fGRmAfMLoO6uC_QU/edit?usp=sharing) and [video recording](https://www.youtube.com/watch?v=L_gjG4BjvSE&ab_channel=Aspecto)

* Episode 4: Getting ready for high scale traffic - [slides](https://docs.google.com/presentation/d/17d9ElzYHwJ2o9lMfDAwGD1nNUFq00-p7BOWdYT22HcI/edit?usp=sharing) and [video recording](https://www.youtube.com/watch?v=tb6VHrihPZI&t=3291s&ab_channel=Aspecto)

* Episode 5: Customizing OpenTelemetry and custom instrumentation - [slides](https://docs.google.com/presentation/d/1pg4Vn_gO6LiIX-S0Wy-kkmXC6QNrKz3yYfFDo2XF9nw/edit?usp=sharing) and [video recording](https://www.youtube.com/watch?v=d2OtY9OX8cA&ab_channel=Aspecto)


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