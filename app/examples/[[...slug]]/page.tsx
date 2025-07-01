import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Tag, Code2, ExternalLink } from 'lucide-react';

interface ExamplePageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface ExampleMeta {
  title: string;
  description?: string;
  tags?: string[];
  category?: 'basic' | 'advanced' | 'integration' | 'tutorial';
  demo?: string;
  repository?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ExampleData {
  content: string;
  metadata: ExampleMeta;
  htmlContent: string;
}

async function getExampleData(slug?: string[]): Promise<ExampleData | null> {
  try {
    // Default to index.md if no slug provided
    const fileName = slug && slug.length > 0 ? slug.join('/') : 'index';
    const filePath = path.join(process.cwd(), 'content', 'examples', `${fileName}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    const htmlContent = processedContent.toString();

    return {
      content,
      metadata: data as ExampleMeta,
      htmlContent,
    };
  } catch (error) {
    console.error('Error reading example:', error);
    return null;
  }
}

// Get all available examples for navigation
function getAvailableExamples(): string[] {
  try {
    const examplesDir = path.join(process.cwd(), 'content', 'examples');
    if (!fs.existsSync(examplesDir)) {
      return [];
    }
    const files = fs.readdirSync(examplesDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error reading examples directory:', error);
    return [];
  }
}

function getCategoryColor(category?: string) {
  switch (category) {
    case 'basic':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    case 'advanced':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    case 'integration':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    case 'tutorial':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  }
}

export default async function ExamplePage({ params }: ExamplePageProps) {
  const { slug } = await params;
  const exampleData = await getExampleData(slug);
  
  if (!exampleData) {
    notFound();
  }

  const { metadata, htmlContent } = exampleData;
  const availableExamples = getAvailableExamples();
  const currentExample = slug ? slug.join('/') : 'index';
  const currentIndex = availableExamples.indexOf(currentExample);
  
  const prevExample = currentIndex > 0 ? availableExamples[currentIndex - 1] : null;
  const nextExample = currentIndex < availableExamples.length - 1 ? availableExamples[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">
          Home
        </Link>
        <span>/</span>
        <Link href="/examples" className="hover:text-gray-900 dark:hover:text-gray-100">
          Examples
        </Link>
        {slug && slug.length > 0 && (
          <>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100">
              {metadata.title || slug.join('/')}
            </span>
          </>
        )}
      </nav>

      {/* Example Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {metadata.title || 'Example'}
          </h1>
        </div>
        
        {metadata.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {metadata.description}
          </p>
        )}

        {/* Links */}
        {(metadata.demo || metadata.repository) && (
          <div className="mt-4 flex gap-4">
            {metadata.demo && (
              <a
                href={metadata.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {metadata.repository && (
              <a
                href={metadata.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Code2 className="h-4 w-4" />
                Source Code
              </a>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {metadata.category && (
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(metadata.category)}`}>
              {metadata.category.charAt(0).toUpperCase() + metadata.category.slice(1)}
            </span>
          )}
          
          {metadata.updatedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                Updated {new Date(metadata.updatedAt).toLocaleDateString()}
              </span>
            </div>
          )}
          
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <div className="flex gap-2">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Example Content */}
      <article className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>

      {/* Navigation */}
      <nav className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {prevExample && (
              <Link
                href={`/examples/${prevExample}`}
                className="group flex items-center space-x-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">Previous</div>
                  <div className="capitalize">{prevExample.replace(/-/g, ' ')}</div>
                </div>
              </Link>
            )}
          </div>
          
          <div className="flex-1 text-right">
            {nextExample && (
              <Link
                href={`/examples/${nextExample}`}
                className="group flex items-center justify-end space-x-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">Next</div>
                  <div className="capitalize">{nextExample.replace(/-/g, ' ')}</div>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Available Examples */}
      {availableExamples.length > 0 && (
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Available Examples
          </h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {availableExamples.map((example) => (
              <Link
                key={example}
                href={`/examples/${example}`}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  example === currentExample
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                }`}
              >
                {example.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Generate static params for known examples
export async function generateStaticParams() {
  try {
    const examplesDir = path.join(process.cwd(), 'content', 'examples');
    if (!fs.existsSync(examplesDir)) {
      return [];
    }
    const files = fs.readdirSync(examplesDir);
    
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        slug: [file.replace('.md', '')],
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each page
export async function generateMetadata({ params }: ExamplePageProps) {
  const { slug } = await params;
  const exampleData = await getExampleData(slug);
  
  if (!exampleData) {
    return {
      title: 'Example Not Found',
    };
  }

  const { metadata } = exampleData;
  
  return {
    title: metadata.title || 'Example',
    description: metadata.description || 'GitBook Manual Example',
    keywords: metadata.tags,
  };
}