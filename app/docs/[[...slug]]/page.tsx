import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';

interface DocPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface DocumentMeta {
  title: string;
  description?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface DocumentData {
  content: string;
  metadata: DocumentMeta;
  htmlContent: string;
}

async function getDocumentData(slug?: string[]): Promise<DocumentData | null> {
  try {
    // Default to welcome.md if no slug provided
    const fileName = slug && slug.length > 0 ? slug.join('/') : 'welcome';
    const filePath = path.join(process.cwd(), 'content', 'docs', `${fileName}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Try without .md extension (in case it's already included)
      const altFilePath = path.join(process.cwd(), 'content', 'docs', slug ? slug.join('/') : 'welcome');
      if (!fs.existsSync(altFilePath)) {
        return null;
      }
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
      metadata: data as DocumentMeta,
      htmlContent,
    };
  } catch (error) {
    console.error('Error reading document:', error);
    return null;
  }
}

// Get all available documents for navigation
function getAvailableDocuments(): string[] {
  try {
    const docsDir = path.join(process.cwd(), 'content', 'docs');
    const files = fs.readdirSync(docsDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error reading docs directory:', error);
    return [];
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const documentData = await getDocumentData(slug);
  
  if (!documentData) {
    notFound();
  }

  const { metadata, htmlContent } = documentData;
  const availableDocs = getAvailableDocuments();
  const currentDoc = slug ? slug.join('/') : 'welcome';
  const currentIndex = availableDocs.indexOf(currentDoc);
  
  const prevDoc = currentIndex > 0 ? availableDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < availableDocs.length - 1 ? availableDocs[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">
          Home
        </Link>
        <span>/</span>
        <Link href="/docs" className="hover:text-gray-900 dark:hover:text-gray-100">
          Documentation
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

      {/* Document Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {metadata.title || 'Documentation'}
        </h1>
        
        {metadata.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {metadata.description}
          </p>
        )}

        {/* Metadata */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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

      {/* Document Content */}
      <article className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>

      {/* Navigation */}
      <nav className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {prevDoc && (
              <Link
                href={`/docs/${prevDoc}`}
                className="group flex items-center space-x-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">Previous</div>
                  <div className="capitalize">{prevDoc.replace(/-/g, ' ')}</div>
                </div>
              </Link>
            )}
          </div>
          
          <div className="flex-1 text-right">
            {nextDoc && (
              <Link
                href={`/docs/${nextDoc}`}
                className="group flex items-center justify-end space-x-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">Next</div>
                  <div className="capitalize">{nextDoc.replace(/-/g, ' ')}</div>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Available Documents */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Available Documentation
        </h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {availableDocs.map((doc) => (
            <Link
              key={doc}
              href={`/docs/${doc}`}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                doc === currentDoc
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
              }`}
            >
              {doc.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Generate static params for known documents
export async function generateStaticParams() {
  try {
    const docsDir = path.join(process.cwd(), 'content', 'docs');
    const files = fs.readdirSync(docsDir);
    
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
export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params;
  const documentData = await getDocumentData(slug);
  
  if (!documentData) {
    return {
      title: 'Document Not Found',
    };
  }

  const { metadata } = documentData;
  
  return {
    title: metadata.title || 'Documentation',
    description: metadata.description || 'GitBook Manual Documentation',
    keywords: metadata.tags,
  };
}