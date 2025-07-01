---
title: 나는 Quick Start
description: Get up and running with GitBook Manual in 5 minutes
tags: [quick-start, tutorial, beginner]
createdAt: 2025-07-01T00:00:00.000Z
updatedAt: 2025-07-01T00:00:00.000Z
---

# Quick Start

Get GitBook Manual up and running in just 5 minutes! This guide will take you through the essential steps to start creating beautiful documentation.

## 🚀 5-Minute Setup

### Step 1: Installation (2 minutes)

The fastest way to get started is with Docker:

```bash
# Clone the repository
git clone https://github.com/your-org/gitbook-manual.git
cd gitbook-manual

# Start with Docker (includes everything)
docker-compose up -d
```

That's it! GitBook Manual is now running at `http://localhost:8080`

### Step 2: Explore the Interface (1 minute)

Open `http://localhost:8080` in your browser and explore:

- **📖 Main Page**: Overview and navigation
- **🔍 Search**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows) to search
- **🌙 Dark Mode**: Toggle in the top-right corner
- **✏️ Editor**: Click "Editor" in the navigation

### Step 3: Create Your First Document (2 minutes)

1. **Open the Editor**: Go to `http://localhost:8080/editor`

2. **Create a New File**:
   - Click the "+" button in the file explorer
   - Name it `my-first-document.md`
   - Click "Create"

3. **Write Content**:
   ```markdown
   # My First Document
   
   Welcome to my documentation site!
   
   ## Features
   
   - ✅ Real-time preview
   - ✅ Markdown support
   - ✅ Image uploads
   - ✅ Search functionality
   
   ## Code Example
   
   ```javascript
   function hello(name) {
     return `Hello, ${name}!`;
   }
   ```
   
   This is **bold** and this is *italic*.
   ```

4. **See the Magic**: Watch the real-time preview update as you type!

## 🎯 Key Features Overview

### Real-Time Editor

The Monaco editor (same engine as VS Code) provides:
- **Syntax highlighting** for Markdown
- **Auto-completion** and snippets
- **Find & Replace** (Cmd+F / Ctrl+F)
- **Auto-save** functionality

### Powerful Search

- **Global search** with `Cmd+K` / `Ctrl+K`
- **Instant results** as you type
- **Keyword highlighting** in results
- **Recent searches** for quick access

### File Management

- **Hierarchical folders** for organization
- **Drag & drop** file operations
- **Context menus** for file actions
- **Real-time file tree** updates

### Image Handling

- **Drag & drop** images into the editor
- **Clipboard paste** (Ctrl+V) for screenshots
- **Automatic compression** for web optimization
- **Image gallery** for management

## 📝 Writing Your First Guide

Let's create a comprehensive guide:

### 1. Plan Your Structure

```
my-documentation/
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── configuration.md
├── guides/
│   ├── user-guide.md
│   └── admin-guide.md
└── api/
    ├── overview.md
    └── endpoints.md
```

### 2. Use Markdown Effectively

```markdown
# Main Heading (H1)

## Section Heading (H2)

### Subsection (H3)

**Bold text** and *italic text*

[Links](https://example.com)

> Blockquotes for important notes

- Bullet lists
- Are great for
- Quick information

1. Numbered lists
2. For step-by-step
3. Instructions

`Inline code` and:

```javascript
// Code blocks with syntax highlighting
function example() {
  console.log("Hello, World!");
}
```

| Feature | Status |
|---------|--------|
| Search  | ✅     |
| Editor  | ✅     |
| Images  | ✅     |
```

### 3. Organize with Frontmatter

Add metadata to your documents:

```yaml
---
title: "My Document Title"
description: "Brief description for SEO"
tags: ["guide", "tutorial", "beginner"]
createdAt: 2025-07-01T00:00:00.000Z
updatedAt: 2025-07-01T00:00:00.000Z
---

# Your content starts here
```

## 🔧 Customization

### Environment Configuration

Create a `.env` file to customize your site:

```env
# Site Identity
NEXT_PUBLIC_SITE_NAME="My Documentation"
NEXT_PUBLIC_SITE_URL="https://mydocs.com"
NEXT_PUBLIC_SITE_DESCRIPTION="Comprehensive documentation for my project"

# Features
ENABLE_SEARCH=true
ENABLE_IMAGE_UPLOAD=true
ENABLE_EDITOR=true

# Content Settings
CONTENT_DIR=content
MAX_FILE_SIZE=10485760
```

### Navigation Structure

Edit `src/lib/config.ts` to customize navigation:

```typescript
export const docsConfig = {
  mainNav: [
    { title: "Documentation", href: "/docs" },
    { title: "Guides", href: "/guides" },
    { title: "API", href: "/api" },
    { title: "Examples", href: "/examples" },
  ],
  // ... more configuration
};
```

## 🎨 Styling and Themes

### Dark Mode

GitBook Manual includes automatic dark mode:
- **System preference**: Automatically follows user's system theme
- **Manual toggle**: Users can override with the theme button
- **Persistent**: Choice is saved in localStorage

### Customizing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

## 🚦 Best Practices

### Content Organization

1. **Use clear folder structure**:
   ```
   content/
   ├── docs/           # Core documentation
   ├── guides/         # Step-by-step tutorials
   ├── examples/       # Code examples
   └── api/           # API reference
   ```

2. **Consistent naming**:
   - Use kebab-case for files: `user-guide.md`
   - Use descriptive names: `getting-started.md` not `start.md`

3. **Logical hierarchy**:
   - Start with overview/introduction
   - Progress from basic to advanced
   - Group related topics together

### Writing Guidelines

1. **Clear headings**: Use descriptive, scannable headings
2. **Short paragraphs**: Keep paragraphs focused and brief
3. **Active voice**: Use active voice for clarity
4. **Code examples**: Include relevant code examples
5. **Visual elements**: Use images, diagrams, and tables

### SEO Optimization

1. **Frontmatter**: Always include title and description
2. **Keywords**: Add relevant tags
3. **Internal linking**: Link between related pages
4. **Image alt text**: Include descriptive alt text for images

## 🔍 Testing Your Setup

### Functionality Checklist

- [ ] **Home page** loads correctly
- [ ] **Navigation** works between sections
- [ ] **Search** finds your content (Cmd+K / Ctrl+K)
- [ ] **Editor** creates and saves files
- [ ] **Images** upload successfully
- [ ] **Dark mode** toggles properly
- [ ] **Mobile view** is responsive

### Performance Check

1. **Page load times**: Should be under 2 seconds
2. **Search speed**: Results should appear instantly
3. **Editor responsiveness**: No lag when typing
4. **Image optimization**: Images should be compressed

## 📚 What's Next?

Now that you have GitBook Manual running:

### Immediate Next Steps

1. **[Installation Guide](./installation)** - Full installation options
2. **[Configuration](./configuration)** - Detailed customization
3. **[API Reference](./api-reference)** - Integration possibilities

### Content Creation

1. **Import existing docs**: Convert your current documentation
2. **Create templates**: Standardize document formats
3. **Set up workflows**: Establish review and update processes

### Advanced Features

1. **Custom components**: Add custom React components
2. **Integrations**: Connect with external tools
3. **Analytics**: Track usage and popular content
4. **CI/CD**: Automate deployment and updates

## 🎉 You're Ready!

Congratulations! You now have a fully functional documentation site. GitBook Manual provides you with:

- **Professional appearance** that users will love
- **Powerful editing tools** for efficient content creation
- **Fast search** to help users find information quickly
- **Responsive design** that works on all devices
- **Modern architecture** that's easy to maintain and extend

Start creating amazing documentation and watch your project's adoption grow! 🚀

---

**Need help?** Check out our [full documentation](./introduction) or join our [community discussions](https://github.com/your-org/gitbook-manual/discussions).