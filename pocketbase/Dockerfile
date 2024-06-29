FROM alpine:latest

ARG PB_VERSION=0.22.12

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pocketbase/

# uncomment to copy the local pb_migrations dir into the image
COPY ./pb_migrations /pocketbase/pb_migrations

#COPY ./pb_data /pocketbase/pb_data

# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8090

# start PocketBase
CMD ["/pocketbase/pocketbase", "serve", "--http=0.0.0.0:8090"]