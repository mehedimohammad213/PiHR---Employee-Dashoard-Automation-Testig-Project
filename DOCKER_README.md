# Docker Setup for PiHR Playwright Automation

This guide covers Docker containerization for the PiHR Playwright automation project, enabling consistent testing environments across different platforms.

## 🐳 Docker Overview

### Benefits
- **Consistent Environment**: Same testing environment across all platforms
- **Isolation**: Tests run in isolated containers
- **Scalability**: Easy to scale test execution
- **CI/CD Integration**: Seamless integration with CI/CD pipelines
- **Cross-platform**: Works on Windows, macOS, and Linux

## 📦 Docker Components

### Dockerfile
- **Base Image**: Node.js 18 Alpine (lightweight)
- **System Dependencies**: Chromium, fonts, certificates
- **Security**: Non-root user execution
- **Optimization**: Multi-stage build for smaller images

### Docker Compose
- **Multiple Services**: Playwright tests, BDD tests, TDD tests, Allure server
- **Volume Mounting**: Persistent test results and reports
- **Network Isolation**: Dedicated test network
- **Service Dependencies**: Proper orchestration

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed
- Docker Compose installed
- Git repository cloned

### Basic Commands

```bash
# Build Docker image
npm run docker:build

# Run tests in Docker
npm run docker:test

# Run BDD tests in Docker
npm run docker:bdd

# Run TDD tests in Docker
npm run docker:tdd

# Serve Allure reports in Docker
npm run docker:allure
```

### Docker Compose Commands

```bash
# Start all services
npm run docker:compose

# Run specific service
npm run docker:compose:test
npm run docker:compose:bdd
npm run docker:compose:tdd

# Stop all services
npm run docker:compose:down
```

## 🔧 Docker Configuration

### Dockerfile Details

```dockerfile
# Base image with Node.js 18
FROM node:18-alpine

# Install system dependencies for Playwright
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set environment variables
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install dependencies and copy project files
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx playwright install --with-deps

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S playwright -u 1001
RUN chown -R playwright:nodejs /app
USER playwright

# Expose port for Allure reports
EXPOSE 8080

# Default command
CMD ["npm", "test"]
```

### Docker Compose Services

```yaml
services:
  playwright-tests:
    build: .
    environment:
      - NODE_ENV=production
      - PLAYWRIGHT_HEADLESS=true
    volumes:
      - ./test-results:/app/test-results
      - ./allure-results:/app/allure-results

  allure-server:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - ./allure-results:/app/allure-results
    command: ["npm", "run", "allure:serve"]

  bdd-tests:
    build: .
    command: ["npm", "run", "bdd"]
    volumes:
      - ./test-results:/app/test-results

  tdd-tests:
    build: .
    command: ["npm", "run", "tdd"]
    volumes:
      - ./test-results:/app/test-results
```

## 🎯 Usage Examples

### Running Different Test Types

```bash
# Standard Playwright tests
docker run --rm pihr-playwright-tests npm test

# BDD tests with Cucumber
docker run --rm pihr-playwright-tests npm run bdd

# TDD tests
docker run --rm pihr-playwright-tests npm run tdd

# Allure tests with reporting
docker run --rm pihr-playwright-tests npm run test:allure
```

### Volume Mounting for Results

```bash
# Mount test results directory
docker run --rm \
  -v $(pwd)/test-results:/app/test-results \
  pihr-playwright-tests npm test

# Mount Allure results
docker run --rm \
  -v $(pwd)/allure-results:/app/allure-results \
  pihr-playwright-tests npm run test:allure

# Mount multiple volumes
docker run --rm \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/allure-results:/app/allure-results \
  -v $(pwd)/screenshots:/app/screenshots \
  pihr-playwright-tests npm test
```

### Docker Compose Orchestration

```bash
# Start all services
docker-compose up --build

# Run specific service
docker-compose run --rm playwright-tests
docker-compose run --rm bdd-tests
docker-compose run --rm tdd-tests

# Start Allure server
docker-compose up allure-server

# Stop all services
docker-compose down
```

## 🔍 Advanced Docker Features

### Multi-stage Builds

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npx playwright install --with-deps
```

### Custom Docker Networks

```bash
# Create custom network
docker network create test-network

# Run container with custom network
docker run --rm \
  --network test-network \
  pihr-playwright-tests npm test
```

### Environment Variables

```bash
# Set environment variables
docker run --rm \
  -e NODE_ENV=production \
  -e PLAYWRIGHT_HEADLESS=true \
  -e DEBUG=pw:api \
  pihr-playwright-tests npm test
```

## 📊 Monitoring and Logs

### View Container Logs

```bash
# View logs for running container
docker logs <container-id>

# Follow logs in real-time
docker logs -f <container-id>

# View logs for specific service
docker-compose logs playwright-tests
docker-compose logs allure-server
```

### Resource Monitoring

```bash
# View container resource usage
docker stats

# View container details
docker inspect <container-id>

# View running containers
docker ps
```

## 🔧 Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

2. **Browser Launch Issues**
   ```bash
   # Run with additional capabilities
   docker run --rm \
     --cap-add=SYS_ADMIN \
     pihr-playwright-tests npm test
   ```

3. **Memory Issues**
   ```bash
   # Increase memory limit
   docker run --rm \
     --memory=2g \
     pihr-playwright-tests npm test
   ```

4. **Network Issues**
   ```bash
   # Use host network
   docker run --rm \
     --network host \
     pihr-playwright-tests npm test
   ```

### Debug Commands

```bash
# Enter container shell
docker run --rm -it pihr-playwright-tests /bin/sh

# Run with debug mode
docker run --rm \
  -e DEBUG=pw:api \
  pihr-playwright-tests npm run test:debug

# Check container health
docker run --rm \
  --health-cmd="npm test" \
  pihr-playwright-tests
```

## 🚀 CI/CD Integration

### GitHub Actions

```yaml
# Docker build and test in CI
- name: Build Docker image
  run: docker build -t pihr-playwright-tests .

- name: Run tests in Docker
  run: |
    docker run --rm \
      -v $(pwd)/test-results:/app/test-results \
      pihr-playwright-tests npm test
```

### Jenkins Pipeline

```groovy
stage('Docker Tests') {
    steps {
        sh 'docker build -t pihr-playwright-tests .'
        sh 'docker run --rm pihr-playwright-tests npm test'
    }
}
```

## 📈 Performance Optimization

### Image Size Optimization

```dockerfile
# Use multi-stage build
FROM node:18-alpine AS deps
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx playwright install --with-deps chromium
```

### Caching Strategies

```bash
# Use Docker layer caching
docker build --cache-from pihr-playwright-tests:latest .

# Use BuildKit for better caching
DOCKER_BUILDKIT=1 docker build .
```

## 🔒 Security Best Practices

### Non-root User
```dockerfile
# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S playwright -u 1001
USER playwright
```

### Security Scanning
```bash
# Scan for vulnerabilities
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image pihr-playwright-tests
```

### Resource Limits
```bash
# Set resource limits
docker run --rm \
  --memory=1g \
  --cpus=1 \
  pihr-playwright-tests npm test
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Playwright Docker Guide](https://playwright.dev/docs/docker)
- [Alpine Linux](https://alpinelinux.org/)

## 🎯 Best Practices

1. **Use Multi-stage Builds**: Reduce final image size
2. **Set Resource Limits**: Prevent resource exhaustion
3. **Use Non-root User**: Improve security
4. **Cache Dependencies**: Speed up builds
5. **Mount Volumes**: Persist test results
6. **Health Checks**: Monitor container health
7. **Security Scanning**: Regular vulnerability scans
8. **Documentation**: Keep Docker setup documented

This Docker setup provides a robust, scalable, and secure environment for running Playwright tests with BDD, TDD, and Allure reporting capabilities.
