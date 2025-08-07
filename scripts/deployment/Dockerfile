# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for Playwright
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# Set environment variables for Playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S playwright -u 1001

# Change ownership of the app directory
RUN chown -R playwright:nodejs /app
USER playwright

# Expose port for Allure reports (optional)
EXPOSE 8080

# Default command to run tests
CMD ["npm", "test"]
