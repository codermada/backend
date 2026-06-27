FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y nodejs npm && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["bash"]