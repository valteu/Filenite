#!/bin/bash

docker build -t pocketbase .

docker run --name test --mount type=volume,src=pocketbase_data,target=/pocketbase/pb_data -dp 127.0.0.1:8090:8090 pocketbase