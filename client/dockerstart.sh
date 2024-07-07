#!/bin/bash

docker build -t frontend .

docker run --name frontend -p 3000:3000 frontend