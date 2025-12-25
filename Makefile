.PHONY: build run

# Variables
IMAGE_NAME = euro-coin-album
PORT = 3000

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -p $(PORT):3000 $(IMAGE_NAME)