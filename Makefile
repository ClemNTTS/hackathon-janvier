# Makefile for building and managing the Docker image and container for hackathon-janvier

# Variables
IMAGE_NAME := hackathon-janvier
CONTAINER_NAME := hackathon-janvier-app
# The port exposed by the container, as defined in the Dockerfile (Nginx default for static content)
CONTAINER_PORT := 80
# The port on your host machine you want to map to the container's port.
# You can change this if 8080 is already in use.
HOST_PORT := 8080

.PHONY: build run stop clean rebuild help

# Build the Docker image
build:
	@echo "Building Docker image $(IMAGE_NAME)..."
	docker build -t $(IMAGE_NAME) .
	@echo "Docker image $(IMAGE_NAME) built successfully."

# Run the Docker container
run: stop
	@echo "Running Docker container $(CONTAINER_NAME)..."
	docker run -d -p $(HOST_PORT):$(CONTAINER_PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME)
	@echo "Container $(CONTAINER_NAME) started on http://localhost:$(HOST_PORT)"
	@echo "Use 'docker logs $(CONTAINER_NAME)' to view container output."
	@echo "===================================================================="
	@echo "app running on http://localhost:$(HOST_PORT)"

# Stop and remove the Docker container
stop:
	@echo "Stopping Docker container $(CONTAINER_NAME) if running..."
	-docker stop $(CONTAINER_NAME) 2>/dev/null || true
	-docker rm $(CONTAINER_NAME) 2>/dev/null || true
	@echo "Container $(CONTAINER_NAME) stopped and removed (if it existed)."

# Remove the Docker image
clean: stop
	@echo "Removing Docker image $(IMAGE_NAME)..."
	-docker rmi $(IMAGE_NAME) 2>/dev/null || true
	@echo "Docker image $(IMAGE_NAME) removed (if it existed)."

# Rebuild and run the Docker container
rebuild: clean build run
	@echo "Project rebuilt and running."

# Display help message
help:
	@echo "Usage:"
	@echo "  make build       - Build the Docker image '$(IMAGE_NAME)'."
	@echo "  make run         - Run the Docker container '$(CONTAINER_NAME)' (maps container port $(CONTAINER_PORT) to host port $(HOST_PORT))."
	@echo "  make stop        - Stop and remove the Docker container."
	@echo "  make clean       - Stop, remove container, and remove Docker image."
	@echo "  make rebuild     - Perform clean, build, and run in sequence."
	@echo "  make help        - Display this help message."
	@echo ""
	@echo "Variables you can override:"
	@echo "  IMAGE_NAME     (default: $(IMAGE_NAME))"
	@echo "  CONTAINER_NAME (default: $(CONTAINER_NAME))"
	@echo "  HOST_PORT      (default: $(HOST_PORT))"
