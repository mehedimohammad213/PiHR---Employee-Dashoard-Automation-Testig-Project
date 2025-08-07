# CI/CD Pipeline Documentation

This guide covers the Continuous Integration and Continuous Deployment (CI/CD) setup for the PiHR Playwright automation project using GitHub Actions.

## 🚀 CI/CD Overview

### Benefits
- **Automated Testing**: Tests run automatically on code changes
- **Quality Gates**: Ensures code quality before deployment
- **Fast Feedback**: Quick identification of issues
- **Consistent Environment**: Same testing environment across all stages
- **Deployment Automation**: Automated deployment to staging and production

## 📋 Pipeline Structure

### CI Pipeline (`.github/workflows/ci.yml`)
1. **Lint and Validate**: Code quality checks
2. **Unit Tests**: Fast unit test execution
3. **Integration Tests**: Cross-browser testing
4. **BDD Tests**: Behavior-driven tests
5. **TDD Tests**: Test-driven development tests
6. **Allure Tests**: Comprehensive reporting
7. **Docker Tests**: Containerized testing
8. **Security Scan**: Vulnerability assessment
9. **Performance Tests**: Performance validation

### CD Pipeline (`.github/workflows/cd.yml`)
1. **Staging Deployment**: Automatic deployment to staging
2. **Production Deployment**: Manual deployment to production
3. **Rollback**: Automatic rollback on failures

## 🔧 GitHub Actions Workflows

### CI Workflow Triggers
```yaml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
```

### CD Workflow Triggers
```yaml
on:
  workflow_run:
    workflows: ["CI/CD Pipeline"]
    types: [completed]
    branches: [main]
```

## 🎯 Pipeline Jobs

### 1. Lint and Validate
```yaml
lint:
  name: Lint and Validate
  runs-on: ubuntu-latest
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
    - name: Install dependencies
      run: npm ci
    - name: Run linting
      run: npm run lint
    - name: Type check
      run: npx tsc --noEmit
```

### 2. Integration Tests
```yaml
integration-tests:
  name: Integration Tests
  runs-on: ubuntu-latest
  strategy:
    matrix:
      browser: [chromium, firefox, webkit]
  steps:
    - name: Setup environment
      uses: actions/setup-node@v4
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test --project=${{ matrix.browser }}
```

### 3. BDD Tests
```yaml
bdd-tests:
  name: BDD Tests
  runs-on: ubuntu-latest
  steps:
    - name: Setup environment
      uses: actions/setup-node@v4
    - name: Install dependencies
      run: npm ci
    - name: Run BDD tests
      run: npm run bdd
    - name: Upload BDD report
      uses: actions/upload-artifact@v4
```

### 4. Allure Reporting
```yaml
allure-tests:
  name: Allure Tests
  runs-on: ubuntu-latest
  steps:
    - name: Setup environment
      uses: actions/setup-node@v4
    - name: Run tests with Allure
      run: npm run test:allure
    - name: Generate Allure report
      run: npm run allure:generate
    - name: Upload Allure results
      uses: actions/upload-artifact@v4
```

### 5. Docker Tests
```yaml
docker-tests:
  name: Docker Tests
  runs-on: ubuntu-latest
  steps:
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    - name: Build Docker image
      run: docker build -t pihr-playwright-tests .
    - name: Run tests in Docker
      run: docker run --rm pihr-playwright-tests npm test
```

## 🚀 Deployment Stages

### Staging Deployment
```yaml
deploy-staging:
  name: Deploy to Staging
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  needs: [integration-tests, bdd-tests, tdd-tests, allure-tests]
  steps:
    - name: Build Docker image
      run: docker build -t pihr-playwright-tests:staging .
    - name: Deploy to staging
      run: echo "Deploying to staging environment"
    - name: Run smoke tests
      run: npm run test:smoke
```

### Production Deployment
```yaml
deploy-production:
  name: Deploy to Production
  runs-on: ubuntu-latest
  if: github.event_name == 'workflow_dispatch'
  environment:
    name: production
    url: https://your-production-url.com
  steps:
    - name: Build Docker image
      run: docker build -t pihr-playwright-tests:production .
    - name: Deploy to production
      run: echo "Deploying to production environment"
    - name: Run smoke tests
      run: npm run test:smoke
```

## 📊 Artifacts and Reports

### Upload Artifacts
```yaml
- name: Upload test results
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: test-results-${{ matrix.browser }}
    path: test-results/
    retention-days: 7

- name: Upload Allure report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: allure-report
    path: allure-report/
    retention-days: 7
```

### Download Artifacts
```yaml
- name: Download test results
  uses: actions/download-artifact@v4
  with:
    name: test-results-chromium
    path: test-results/
```

## 🔍 Security and Quality Gates

### Security Scan
```yaml
security-scan:
  name: Security Scan
  runs-on: ubuntu-latest
  steps:
    - name: Run security audit
      run: npm audit --audit-level=moderate
    - name: Run dependency check
      run: npx audit-ci --moderate
```

### Performance Tests
```yaml
performance-tests:
  name: Performance Tests
  runs-on: ubuntu-latest
  steps:
    - name: Run performance tests
      run: npm run test:performance
    - name: Upload performance results
      uses: actions/upload-artifact@v4
```

## 🎯 Environment Management

### Environment Variables
```yaml
env:
  NODE_VERSION: '18'
  NODE_ENV: 'production'
  PLAYWRIGHT_HEADLESS: 'true'
```

### Secrets Management
```yaml
- name: Deploy to production
  run: |
    echo "Deploying with secrets"
    # Use ${{ secrets.PRODUCTION_URL }}
    # Use ${{ secrets.DEPLOY_KEY }}
```

## 📈 Monitoring and Notifications

### Slack Notifications
```yaml
- name: Notify on success
  if: success()
  run: |
    curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"✅ Pipeline succeeded!"}' \
    ${{ secrets.SLACK_WEBHOOK }}

- name: Notify on failure
  if: failure()
  run: |
    curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"❌ Pipeline failed!"}' \
    ${{ secrets.SLACK_WEBHOOK }}
```

### Email Notifications
```yaml
- name: Send email notification
  if: always()
  run: |
    echo "Pipeline status: ${{ job.status }}"
    # Add email sending logic
```

## 🔧 Advanced Features

### Parallel Execution
```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

### Conditional Steps
```yaml
- name: Run tests
  run: npm test
  if: github.event_name == 'push'

- name: Run additional tests
  run: npm run test:additional
  if: github.ref == 'refs/heads/main'
```

### Manual Triggers
```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
```

## 🚀 Local Development

### Running CI Locally
```bash
# Install act (GitHub Actions runner)
brew install act

# Run CI workflow locally
act push

# Run specific job
act -j integration-tests
```

### Testing Workflows
```bash
# Validate workflow syntax
act --list

# Dry run workflow
act --dryrun
```

## 🔧 Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   # Fix file permissions
   chmod +x .github/workflows/*.yml
   ```

2. **Docker Build Failures**
   ```bash
   # Check Docker context
   docker build --no-cache .
   ```

3. **Test Failures**
   ```bash
   # Run tests locally first
   npm test
   npm run bdd
   npm run tdd
   ```

4. **Artifact Upload Issues**
   ```bash
   # Check artifact paths
   ls -la test-results/
   ls -la allure-results/
   ```

### Debug Commands

```bash
# Check workflow syntax
yamllint .github/workflows/*.yml

# Validate GitHub Actions
act --list

# Test specific job
act -j lint
```

## 📊 Metrics and Analytics

### Pipeline Metrics
- **Build Time**: Track pipeline execution time
- **Success Rate**: Monitor test pass rates
- **Deployment Frequency**: Track deployment frequency
- **Lead Time**: Measure time from commit to deployment

### Quality Metrics
- **Code Coverage**: Track test coverage
- **Security Issues**: Monitor security vulnerabilities
- **Performance**: Track performance metrics
- **Reliability**: Monitor system reliability

## 🎯 Best Practices

### CI/CD Best Practices
1. **Fast Feedback**: Keep pipeline execution time short
2. **Quality Gates**: Implement proper quality checks
3. **Security First**: Include security scanning
4. **Monitoring**: Monitor pipeline health
5. **Documentation**: Keep pipeline documentation updated
6. **Testing**: Test pipeline changes locally
7. **Rollback**: Implement proper rollback procedures
8. **Notifications**: Set up proper notifications

### Pipeline Optimization
1. **Caching**: Use proper caching strategies
2. **Parallelization**: Run jobs in parallel when possible
3. **Resource Management**: Optimize resource usage
4. **Artifact Management**: Clean up old artifacts
5. **Monitoring**: Monitor pipeline performance

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker GitHub Actions](https://docs.docker.com/ci-cd/github-actions/)
- [Playwright CI/CD Guide](https://playwright.dev/docs/ci)
- [Allure CI/CD Integration](https://docs.qameta.io/allure/#_continuous_integration)

## 🔒 Security Considerations

### Secrets Management
- Use GitHub Secrets for sensitive data
- Rotate secrets regularly
- Limit secret access to necessary workflows

### Security Scanning
- Regular dependency vulnerability scans
- Container security scanning
- Code security analysis

### Access Control
- Limit workflow permissions
- Use least privilege principle
- Monitor workflow access

This CI/CD setup provides a robust, automated pipeline for testing and deploying the PiHR Playwright automation project with proper quality gates, security checks, and deployment automation.
