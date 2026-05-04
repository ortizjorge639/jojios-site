import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.meta.title} · joji.os`,
    description: post.meta.description,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/blog" className="text-joji-muted text-sm hover:text-joji-green transition-colors">
          ← clawiki
        </Link>
      </div>

      <header className="mb-10">
        <div className="flex gap-2 flex-wrap mb-4">
          {post.meta.tags.map(tag => (
            <span key={tag} className="text-xs border border-joji-border text-joji-muted px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-white leading-tight mb-3">
          {post.meta.title}
        </h1>
        {post.meta.description && (
          <p className="text-gray-400 text-lg leading-relaxed">{post.meta.description}</p>
        )}
        <div className="flex items-center gap-4 mt-4 text-joji-muted text-sm">
          <span>{post.meta.author || 'Joji + Claw 🦞'}</span>
          <span>·</span>
          <span>{post.meta.date}</span>
        </div>
      </header>

      <article
        className="prose-joji"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
    </div>
  )
}

// Simple markdown → HTML renderer (no heavy deps)
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
    .replace(/^(?!<[hup]|<li|<pre|<blockquote)(.+)$/gm, '<p>$1</p>')
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
}
