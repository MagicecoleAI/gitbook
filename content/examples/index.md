---
title: 나는 example
description: Real-world examples and code samples for GitBook Manual
tags: [examples, code, samples, demos]
createdAt: 2025-07-01T00:00:00.000Z
updatedAt: 2025-07-01T00:00:00.000Z
---

# 나는 example

Explore real-world examples and code samples to help you build amazing documentation sites with GitBook Manual.

## 🎨 Live Examples

### Basic Examples
- **[Simple Documentation Site](./basic-docs)** - Clean, minimal documentation
- **[Product Manual](./product-manual)** - User guide for a software product
- **[API Documentation](./api-docs)** - Complete API reference site

### Advanced Examples
- **[Multi-language Docs](./multi-language)** - Internationalization example
- **[Custom Components](./custom-components)** - Extended functionality
- **[Integration Examples](./integrations)** - Third-party service connections

### Industry-Specific
- **[Software Development](./software-dev)** - Developer documentation
- **[SaaS Product](./saas-product)** - Customer-facing documentation
- **[Internal Wiki](./internal-wiki)** - Company knowledge base

## 📂 Example Categories

### 🟢 Basic Examples
Perfect for beginners and simple use cases:

| Example | Description | Features |
|---------|-------------|----------|
| **Basic Docs** | Simple documentation site | Clean layout, basic navigation |
| **Getting Started** | Onboarding documentation | Step-by-step guides, screenshots |
| **FAQ Site** | Frequently asked questions | Search, categories, quick answers |

### 🟡 Intermediate Examples  
Great for expanding functionality:

| Example | Description | Features |
|---------|-------------|----------|
| **Product Manual** | Complete product documentation | Multi-section, rich media, search |
| **API Docs** | Developer-focused documentation | Code samples, interactive examples |
| **Team Wiki** | Internal knowledge sharing | User management, private sections |

### 🔴 Advanced Examples
For complex requirements:

| Example | Description | Features |
|---------|-------------|----------|
| **Multi-language** | Internationalized documentation | Language switching, localized content |
| **Custom Platform** | Heavily customized implementation | Custom components, integrations |
| **Enterprise Docs** | Large-scale documentation system | Advanced search, analytics, SSO |

## 🛠️ Code Samples

### Basic Setup Examples

**Simple Configuration**
```javascript
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
}

module.exports = nextConfig
```

**Environment Setup**
```env
NEXT_PUBLIC_SITE_NAME="My Documentation"
NEXT_PUBLIC_SITE_URL="https://docs.mysite.com"
ENABLE_SEARCH=true
ENABLE_EDITOR=true
```

### Custom Component Examples

**Info Box Component**
```jsx
export function InfoBox({ type, children }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  }

  return (
    <div className={`p-4 border rounded-lg ${styles[type]}`}>
      {children}
    </div>
  )
}
```

**Code Block with Copy Button**
```jsx
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CodeBlock({ children, language }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className={`language-${language}`}>
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  )
}
```

### Integration Examples

**Search Integration**
```javascript
// Custom search provider
export async function searchContent(query) {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
  const data = await response.json()
  return data.results
}

// Usage in component
const [results, setResults] = useState([])

useEffect(() => {
  if (query) {
    searchContent(query).then(setResults)
  }
}, [query])
```

**Analytics Integration**
```javascript
// Google Analytics 4
export function trackPageView(url) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
    })
  }
}

// Usage in app
useEffect(() => {
  trackPageView(router.pathname)
}, [router.pathname])
```

## 🚀 Quick Start Templates

### Documentation Starter
```bash
# Clone a basic documentation template
git clone https://github.com/your-org/gitbook-docs-starter.git
cd gitbook-docs-starter
npm install
npm run dev
```

### API Documentation Template
```bash
# Clone API documentation template
git clone https://github.com/your-org/gitbook-api-starter.git
cd gitbook-api-starter
npm install
npm run dev
```

### Multi-language Template
```bash
# Clone internationalization template
git clone https://github.com/your-org/gitbook-i18n-starter.git
cd gitbook-i18n-starter
npm install
npm run dev
```

## 🎯 Use Case Examples

### Software Product Documentation
```
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── first-steps.md
├── user-guide/
│   ├── dashboard.md
│   ├── settings.md
│   └── integrations.md
├── developer/
│   ├── api-reference.md
│   ├── webhooks.md
│   └── sdks.md
└── troubleshooting/
    ├── common-issues.md
    └── contact-support.md
```

### Internal Company Wiki
```
├── company/
│   ├── mission-vision.md
│   ├── org-chart.md
│   └── policies.md
├── processes/
│   ├── onboarding.md
│   ├── development.md
│   └── deployment.md
├── tools/
│   ├── slack-guidelines.md
│   ├── github-workflow.md
│   └── design-system.md
└── resources/
    ├── learning.md
    └── templates.md
```

### API Documentation
```
├── overview/
│   ├── authentication.md
│   ├── rate-limiting.md
│   └── errors.md
├── endpoints/
│   ├── users.md
│   ├── products.md
│   └── orders.md
├── guides/
│   ├── getting-started.md
│   ├── best-practices.md
│   └── examples.md
└── sdks/
    ├── javascript.md
    ├── python.md
    └── php.md
```

## 📋 Checklist for New Examples

When creating a new example:

- [ ] **Clear README** with setup instructions
- [ ] **Working demo** deployed online
- [ ] **Source code** with comments
- [ ] **Documentation** explaining features
- [ ] **Screenshots** or GIFs showing functionality
- [ ] **Dependencies** list and versions
- [ ] **License** information
- [ ] **Contributing** guidelines

## 🤝 Contributing Examples

Have a great example to share?

1. **Fork the repository**
2. **Create your example** in a new folder
3. **Add documentation** and screenshots
4. **Test thoroughly** across different devices
5. **Submit a pull request** with description

### Example Submission Template

```markdown
## Example Name

**Description**: Brief description of what this example demonstrates

**Features**:
- Feature 1
- Feature 2
- Feature 3

**Live Demo**: [Link to demo](https://demo.example.com)

**Screenshot**:
![Screenshot](./screenshot.png)

**Setup Instructions**:
1. Clone the repository
2. Install dependencies
3. Configure environment
4. Run the application
```

## 🔗 External Resources

### Community Examples
- [Awesome GitBook Examples](https://github.com/your-org/awesome-gitbook-examples)
- [Community Showcase](https://community.gitbook-manual.com/showcase)
- [Template Gallery](https://templates.gitbook-manual.com)

### Related Tools
- [Markdown Tools](https://markdowntools.com)
- [Documentation Generators](https://docs-generators.com)
- [Static Site Generators](https://jamstack.org/generators)

Ready to explore? Pick an example that matches your use case and start building! 🚀