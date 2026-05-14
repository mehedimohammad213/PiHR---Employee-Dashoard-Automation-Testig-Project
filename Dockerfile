# Use the official Playwright image with Node.js and pre-installed browsers
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Create a non-root user for security
RUN useradd --create-home --shell /bin/bash playwright
RUN chown -R playwright:playwright /app
USER playwright

# Default command to run tests
CMD ["npm", "test"]