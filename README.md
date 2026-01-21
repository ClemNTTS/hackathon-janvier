## Docker Setup

To facilitate development and deployment, this project includes a `Dockerfile` and a `Makefile` for managing Docker images and containers.

### Prerequisites

- Docker installed on your system.

### Usage

1.  **Build the Docker image:**

    ```bash
    make build
    ```

2.  **Run the application in a Docker container:**
    This will start the application and map the container's port 80 to your host's port 8080.
    You can then access the application in your browser at `http://localhost:8080`.

    ```bash
    make run
    ```

3.  **Stop the running container:**

    ```bash
    make stop
    ```

4.  **Remove the Docker image and container:**

    ```bash
    make clean
    ```

5.  **Rebuild and run the application (clean build):**
    ```bash
    make rebuild
    ```

For more options, you can run `make help`.
