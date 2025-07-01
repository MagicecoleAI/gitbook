---
title: Components
description: Overview of GitBook Manual components and their usage
tags: [components, ui, architecture]
createdAt: 2025-07-01T00:00:00.000Z
updatedAt: 2025-07-01T00:00:00.000Z
---

# Components

GitBook Manual is built with a modular component architecture that makes it easy to customize and extend. This section covers the main components and how to work with them.

## 🧩 Component Architecture

The application follows a clear component hierarchy:

```
App Layout
├── Header (Navigation, Search, Theme Toggle)
├── Main Content Area
│   ├── Sidebar (Navigation Tree) 
│   ├── Content (Markdown Rendering)
│   └── Right Panel (Table of Contents)
└── Footer
```

## 📂 Component Categories

### **Layout Components**
- **[Layout](./components/layout)** - Main application layout and structure
- **[Header](./components/layout#header)** - Top navigation and branding
- **[Sidebar](./components/layout#sidebar)** - Left navigation panel
- **[Footer](./components/layout#footer)** - Bottom information area

### **Navigation Components** 
- **[Navigation](./components/navigation)** - Menu systems and routing
- **[Breadcrumb](./components/navigation#breadcrumb)** - Path navigation
- **[Page Navigation](./components/navigation#page-navigation)** - Previous/Next links
- **[Table of Contents](./components/navigation#table-of-contents)** - Document outline

### **Content Components**
- **[Content](./components/content)** - Markdown rendering and display
- **[Editor](./components/content#editor)** - Monaco-based markdown editor
- **[Preview](./components/content#preview)** - Live markdown preview
- **[Search](./components/content#search)** - Content search functionality

## 🎨 Component Features

### Responsive Design
All components are built with mobile-first responsive design:
- **Mobile**: Optimized for touch interaction
- **Tablet**: Adaptive layout with collapsible sidebar
- **Desktop**: Full three-column layout

### Dark Mode Support
Every component includes dark mode styling:
- **Automatic detection**: Follows system preference
- **Manual toggle**: User can override system setting
- **Consistent theming**: All components use the same color variables

### Accessibility
Components follow WCAG 2.1 AA guidelines:
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Screen readers**: Proper ARIA labels and semantic HTML
- **Focus management**: Clear focus indicators and logical tab order
- **Color contrast**: Meets minimum contrast requirements

## 🛠️ Customization

### Theme Variables
Customize the appearance by modifying CSS variables:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --background: #ffffff;
  --foreground: #0f172a;
  --border: #e2e8f0;
}

[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #f8fafc;
  --border: #334155;
}
```

### Component Props
Most components accept standard props for customization:

```typescript
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'compact' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}
```

## 🔧 Development

### Adding New Components

1. **Create the component file**:
   ```typescript
   // src/components/ui/MyComponent.tsx
   export function MyComponent({ children, className }: Props) {
     return (
       <div className={cn("base-styles", className)}>
         {children}
       </div>
     );
   }
   ```

2. **Export from index**:
   ```typescript
   // src/components/ui/index.ts
   export { MyComponent } from './MyComponent';
   ```

3. **Add to Storybook** (if using):
   ```typescript
   // src/components/ui/MyComponent.stories.tsx
   export default {
     title: 'UI/MyComponent',
     component: MyComponent,
   };
   ```

### Component Guidelines

- **Single Responsibility**: Each component should have one clear purpose
- **Composability**: Components should work well together
- **Consistency**: Follow established patterns and naming conventions
- **Performance**: Use React.memo() and useMemo() when appropriate
- **Testing**: Include unit tests for complex logic

## 📋 Component Checklist

When creating or modifying components, ensure:

- [ ] **Responsive**: Works on all screen sizes
- [ ] **Accessible**: Keyboard navigation and ARIA labels
- [ ] **Dark mode**: Proper styling for both themes
- [ ] **TypeScript**: Full type safety
- [ ] **Documented**: Clear props and usage examples
- [ ] **Tested**: Unit tests for functionality
- [ ] **Consistent**: Follows design system patterns

## 🔗 Related Resources

- **[Layout Documentation](./components/layout)** - Detailed layout component guide
- **[Navigation Documentation](./components/navigation)** - Navigation component reference
- **[Content Documentation](./components/content)** - Content rendering components
- **[Design System](./design-system)** - Color, typography, and spacing guidelines
- **[Development Guide](./development)** - Setup and contribution instructions

## 📚 Next Steps

1. **Explore Layout**: Start with [layout components](./components/layout) to understand the structure
2. **Learn Navigation**: Review [navigation components](./components/navigation) for menu systems
3. **Content Rendering**: Check [content components](./components/content) for markdown handling
4. **Customize**: Modify themes and styles to match your brand
5. **Extend**: Add custom components following the established patterns