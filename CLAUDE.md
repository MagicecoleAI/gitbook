# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Development server (port 8080)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

### Testing
```bash
# Run all tests (lint + unit + e2e)
npm run test:all

# Unit tests
npm run test              # Single run
npm run test:watch        # Watch mode

# E2E tests with Playwright
npm run test:e2e          # Headless mode
npm run test:e2e:ui       # UI mode  
npm run test:e2e:debug    # Debug mode
npm run test:e2e:report   # View test report
```

### Docker Development
```bash
# Development with Docker
docker-compose up -d

# Production build
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose build --no-cache
```

## Architecture Overview

This is a **GitBook-style documentation platform** built with:
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Editor**: Monaco Editor (VS Code engine)
- **Search**: FlexSearch
- **Testing**: Playwright (E2E), Jest (Unit), React Testing Library
- **Deployment**: Docker + Docker Compose

### Key Features
- **Real-time Markdown Editor**: Monaco-based with live preview
- **File Management**: Hierarchical file tree with CRUD operations
- **Search System**: Full-text search with keyboard shortcuts (Cmd+K)
- **Image Management**: Drag & drop upload, clipboard paste, compression
- **Responsive UI**: GitBook-style 3-column layout
- **Dark Mode**: Complete light/dark theme system
- **Testing Suite**: 94.7% success rate with comprehensive test coverage

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── documents/     # Document CRUD
│   │   ├── images/        # Image upload
│   │   ├── search/        # Search API
│   │   └── health/        # Health check
│   ├── editor/            # Editor page with independent layout
│   └── layout.tsx         # Root layout with ConditionalLayout
├── src/
│   ├── components/        # React components
│   │   ├── editor/       # Monaco editor, toolbar, tabs, image manager
│   │   ├── search/       # Search modal, results, shortcuts
│   │   ├── file-explorer/ # File tree, context menus
│   │   ├── navigation/   # Breadcrumb, page navigation
│   │   └── ui/           # Common UI components
│   ├── lib/              # Utilities and configuration
│   │   ├── config.ts     # Environment-based site configuration
│   │   └── utils.ts      # Common utility functions
│   └── types/            # TypeScript type definitions
├── content/              # Markdown content files
├── tests/                # Test files (unit, integration, e2e)
└── docs/                 # Project documentation
```

## Configuration System

The application uses **environment variables** for all configuration:

### Key Environment Variables
```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME="GitBook Manual Site"
NEXT_PUBLIC_SITE_URL="http://localhost:8080"

# Content Directories
CONTENT_DIR="content"
UPLOADS_DIR="public/uploads"
IMAGES_DIR="public/uploads/images"

# Feature Flags
ENABLE_SEARCH=true
ENABLE_IMAGE_UPLOAD=true
ENABLE_EDITOR=true

# API Settings
API_TIMEOUT=5000
SEARCH_DEBOUNCE_MS=300
MAX_FILE_SIZE=10485760
```

Configuration is centralized in `src/lib/config.ts` with dynamic feature toggles.

## Development Patterns

### Component Organization
- **Editor components**: Independent layout in `/app/editor/` 
- **Conditional layouts**: `ConditionalLayout` handles different page layouts
- **Feature flags**: All major features can be toggled via environment variables
- **API structure**: RESTful endpoints with consistent error handling

### File Management
- **Documents API**: `/api/documents/[...path]` handles CRUD operations
- **File tree**: Hierarchical structure with drag & drop support
- **Auto-save**: Automatic document saving with status indicators

### Search Implementation
- **FlexSearch**: High-performance client-side search
- **API endpoint**: `/api/search` for server-side search
- **Keyboard shortcuts**: Global Cmd+K/Ctrl+K search modal
- **Recent searches**: localStorage-based search history

### Image System
- **Upload API**: `/api/images` with file validation and compression
- **Drag & drop**: Full drag & drop support with progress indicators
- **Clipboard paste**: Automatic image upload from clipboard (Ctrl+V)
- **Image gallery**: Management modal with search and filtering

## Testing Strategy

The project has comprehensive testing:
- **E2E Tests**: Playwright covering user workflows
- **Unit Tests**: Jest + React Testing Library for components
- **Integration Tests**: API endpoint testing
- **Manual Tests**: Documented test cases in `/tests/manual_test_cases.md`

Current test success rate: **94.7% (18/19 tests passing)**

## Editor Integration

The Monaco editor is fully integrated with:
- **Keyboard shortcuts**: Cmd+F (find), Cmd+H (replace), Cmd+B (bold)
- **Toolbar actions**: All formatting tools available via buttons
- **Real-time preview**: Synchronized markdown rendering
- **Image insertion**: Direct image upload and URL insertion
- **Auto-save**: Automatic saving with visual indicators

## Docker Development

The application runs in Docker containers:
- **Development**: `gitbook-dev` service with hot reload
- **Production**: `gitbook-app` service with optimized build
- **Health checks**: Built-in health monitoring
- **Volume persistence**: Content and uploads persist across restarts

## Important Development Notes

1. **Editor Layout**: `/editor` uses independent `EditorLayout` to avoid conflicting with main site layout
2. **Environment Variables**: All hardcoded values have been moved to environment variables
3. **Feature Flags**: Major features can be disabled via environment variables
4. **API Security**: All endpoints include input validation and path traversal protection
5. **Type Safety**: Full TypeScript coverage with strict type checking
6. **Performance**: Debounced search, image compression, and optimized re-renders

## Common Development Tasks

### Adding New Features
1. Check if feature flags are needed in `src/lib/config.ts`
2. Add TypeScript types in `src/types/index.ts`
3. Create components following existing patterns
4. Add API endpoints if needed in `app/api/`
5. Write tests in appropriate test directories

### Debugging Issues
1. Check Docker container logs: `docker-compose logs -f`
2. Verify environment variables are loaded correctly
3. Use browser dev tools for client-side debugging
4. Check API responses in Network tab
5. Run specific test suites to isolate issues

### Testing New Changes
1. Run unit tests: `npm run test`
2. Run E2E tests: `npm run test:e2e`
3. Test in both light and dark modes
4. Verify responsive design on different screen sizes
5. Test keyboard shortcuts and accessibility features