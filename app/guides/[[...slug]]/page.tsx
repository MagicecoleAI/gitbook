import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Tag, BookOpen } from 'lucide-react';

interface GuidePageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface GuideMeta {
  title: string;
  description?: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  createdAt?: string;
  updatedAt?: string;
}

interface GuideData {
  content: string;
  metadata: GuideMeta;
  htmlContent: string;
}

async function getGuideData(slug?: string[]): Promise<GuideData | null> {
  try {
    // Default to index.md if no slug provided
    const fileName = slug && slug.length > 0 ? slug.join('/') : 'index';
    const filePath = path.join(process.cwd(), 'content', 'guides', `${fileName}.md`);
    
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
      metadata: data as GuideMeta,
      htmlContent,
    };
  } catch (error) {
    console.error('Error reading guide:', error);
    return null;
  }
}

// Get all available guides for navigation
function getAvailableGuides(): string[] {
  try {
    const guidesDir = path.join(process.cwd(), 'content', 'guides');
    if (!fs.existsSync(guidesDir)) {
      return [];
    }
    const files = fs.readdirSync(guidesDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error reading guides directory:', error);
    return [];
  }
}

function getDifficultyColor(difficulty?: string) {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'advanced':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guideData = await getGuideData(slug);
  
  if (!guideData) {
    notFound();
  }

  const { metadata, htmlContent } = guideData;
  const availableGuides = getAvailableGuides();
  const currentGuide = slug ? slug.join('/') : 'index';
  const currentIndex = availableGuides.indexOf(currentGuide);
  
  const prevGuide = currentIndex > 0 ? availableGuides[currentIndex - 1] : null;
  const nextGuide = currentIndex < availableGuides.length - 1 ? availableGuides[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-gray-900 dark:hover:text-gray-100">
          Guides
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

      {/* Guide Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {metadata.title || 'Guide'}
          </h1>
        </div>
        
        {metadata.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {metadata.description}
          </p>
        )}

        {/* Metadata */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {metadata.difficulty && (
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getDifficultyColor(metadata.difficulty)}`}>
              {metadata.difficulty.charAt(0).toUpperCase() + metadata.difficulty.slice(1)}
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

      {/* Guide Content */}
      <article className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>

      {/* Navigation */}
      <nav className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {prevGuide && (
              <Link
                href={`/guides/${prevGuide}`}
                className="group flex items-center space-x-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">Previous</div>
                  <div className="capitalize">{prevGuide.replace(/-/g, ' ')}</div>
                </div>
              </Link>
            )}
          </div>
          
          <div className="flex-1 text-right">
            {nextGuide && (
              <Link
                href={`/guides/${nextGuide}`}
                className="group flex items-center justify-end space-x-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">Next</div>
                  <div className="capitalize">{nextGuide.replace(/-/g, ' ')}</div>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Available Guides */}
      {availableGuides.length > 0 && (
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Available Guides
          </h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {availableGuides.map((guide) => (
              <Link
                key={guide}
                href={`/guides/${guide}`}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  guide === currentGuide
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                }`}
              >
                {guide.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Generate static params for known guides
export async function generateStaticParams() {
  try {
    const guidesDir = path.join(process.cwd(), 'content', 'guides');
    if (!fs.existsSync(guidesDir)) {
      return [];
    }
    const files = fs.readdirSync(guidesDir);
    
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
export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guideData = await getGuideData(slug);
  
  if (!guideData) {
    return {
      title: 'Guide Not Found',
    };
  }

  const { metadata } = guideData;
  
  return {
    title: metadata.title || 'Guide',
    description: metadata.description || 'GitBook Manual Guide',
    keywords: metadata.tags,
  };
}