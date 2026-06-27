IMAGE_NAME=my-node-image
CONTAINER_NAME=my-node-container

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run --rm -it \
		-v $(PWD):/app \
		-w /app \
		--name $(CONTAINER_NAME) \
		-p 3000:3000 \
		$(IMAGE_NAME)

shell: run

exec:
	docker exec -it my-node-container bash

clean:
	docker rmi $(IMAGE_NAME)