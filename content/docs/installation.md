---
title: 나는 Installation
description: Complete installation guide for GitBook Manual
tags: [installation, setup, getting-started]
createdAt: 2025-07-01T00:00:00.000Z
updatedAt: 2025-07-01T00:00:00.000Z
---

# Installation

This guide will walk you through installing GitBook Manual on your system. We'll cover multiple installation methods to suit different use cases and environments.

## Prerequisites

Before installing GitBook Manual, ensure you have the following software installed on your system:

### Required Software

- **Node.js** (version 18 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Git** (for version control)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Optional but Recommended

- **Docker** and **Docker Compose** (for containerized deployment)
  - Download from [docker.com](https://www.docker.com/)
  - Verify installation: `docker --version` and `docker-compose --version`

- **VS Code** (recommended code editor)
  - Download from [code.visualstudio.com](https://code.visualstudio.com/)

## Installation Methods

### Method 1: Quick Start with Docker (Recommended)

The fastest way to get GitBook Manual running is with Docker:

```bash
# Clone the repository
git clone https://github.com/your-org/gitbook-manual.git
cd gitbook-manual

# Start with Docker Compose
docker-compose up -d
```

Access your site at `http://localhost:8080`

### Method 2: Local Development Setup

For development or customization:

```bash
# Clone the repository
git clone https://github.com/your-org/gitbook-manual.git
cd gitbook-manual

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your configuration

# Start development server
npm run dev
```

### Method 3: Production Deployment

For production environments:

```bash
# Clone and install
git clone https://github.com/your-org/gitbook-manual.git
cd gitbook-manual
npm install

# Build for production
npm run build

# Start production server
npm run start
```

## Environment Configuration

GitBook Manual uses environment variables for configuration. Create a `.env` file in the project root:

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME="Your Documentation Site"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_DESCRIPTION="Your site description"

# Content Configuration
CONTENT_DIR=content
UPLOADS_DIR=public/uploads
IMAGES_DIR=public/uploads/images

# Feature Flags
ENABLE_SEARCH=true
ENABLE_IMAGE_UPLOAD=true
ENABLE_EDITOR=true

# API Configuration
API_TIMEOUT=5000
SEARCH_DEBOUNCE_MS=300
MAX_FILE_SIZE=10485760
```

## Directory Structure

After installation, your project structure will look like this:

```
gitbook-manual/
├── app/                    # Next.js App Router
├── src/
│   ├── components/         # React components
│   ├── lib/               # Utilities
│   └── types/             # TypeScript types
├── content/               # Your documentation
│   ├── docs/             # Documentation pages
│   ├── guides/           # Guide pages
│   └── examples/         # Example pages
├── public/               # Static assets
├── docker-compose.yml    # Docker configuration
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## Verification

After installation, verify everything is working:

### 1. Check the Application

Visit `http://localhost:8080` and verify:
- ✅ Main page loads correctly
- ✅ Navigation menu is functional
- ✅ Search functionality works (Cmd+K / Ctrl+K)
- ✅ Dark/light mode toggle works

### 2. Test the Editor

Visit `http://localhost:8080/editor` and verify:
- ✅ File explorer loads
- ✅ Markdown editor is functional
- ✅ Real-time preview works
- ✅ Image upload works (if enabled)

### 3. Check API Endpoints

Test the API endpoints:

```bash
# Health check
curl http://localhost:8080/api/health

# Documents API
curl http://localhost:8080/api/documents

# Search API
curl "http://localhost:8080/api/search?q=welcome"
```

## Troubleshooting

### Common Issues

**Port 8080 is already in use**
```bash
# Check what's using the port
lsof -i :8080

# Change port in .env file
PORT=3000
```

**Node.js version issues**
```bash
# Check your Node.js version
node --version

# Use Node Version Manager if needed
nvm install 18
nvm use 18
```

**Docker issues**
```bash
# Reset Docker environment
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Permission issues**
```bash
# Fix npm permission issues
sudo chown -R $(whoami) ~/.npm
```

### Getting Help

If you encounter issues:

1. **Check the logs**:
   ```bash
   # Docker logs
   docker-compose logs -f
   
   # Local development
   npm run dev
   ```

2. **Search existing issues**: Check the [GitHub Issues](https://github.com/your-org/gitbook-manual/issues)

3. **Create a new issue**: If you can't find a solution, create a new issue with:
   - Your operating system
   - Node.js version
   - Error messages
   - Steps to reproduce

## Next Steps

Now that GitBook Manual is installed:

1. **[Quick Start Guide](./getting-started)** - Learn the basic features
2. **[Configuration Guide](./configuration)** - Customize your installation
3. **[Editor Guide](../editor)** - Start creating content
4. **[API Reference](./api-reference)** - Integrate with external systems

## Security Considerations

### Production Deployment

When deploying to production:

- **Environment Variables**: Never commit `.env` files to version control
- **HTTPS**: Always use HTTPS in production
- **Authentication**: Implement proper authentication if needed
- **File Uploads**: Configure proper file upload limits and validation
- **Updates**: Keep dependencies updated regularly

### Recommended Security Headers

Add these headers to your web server configuration:

```nginx
# Nginx example
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```

## Performance Optimization

### Production Optimizations

- **Static Generation**: Most pages are pre-generated at build time
- **Image Optimization**: Next.js automatically optimizes images
- **Caching**: Configure appropriate cache headers
- **CDN**: Consider using a CDN for static assets

### Monitoring

Consider setting up monitoring for:
- Application health (`/api/health`)
- Response times
- Error rates
- Resource usage

Congratulations! GitBook Manual is now installed and ready to use. 🎉