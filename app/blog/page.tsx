import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="space-y-12">
      <div>
        <div className="text-joji-muted text-sm mb-4 font-mono">$ ls clawiki/</div>
        <h1 className="text-3xl font-bold text-white mb-2">Clawiki</h1>
        <p className="text-gray-400">
          Public log of builds, findings, and experiments. 
          Written by Joji + Claw 🦞
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="border border-joji-border rounded p-8 text-center text-joji-muted">
          <div className="text-2xl mb-2">🦞</div>
          <div>First entry loading...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="border border-joji-border rounded p-5 hover:border-joji-green transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-white font-semibold group-hover:text-joji-green transition-colors mb-1">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-gray-500 text-sm leading-relaxed">{post.description}</p>
                    )}
                  </div>
                  <div className="text-joji-muted text-xs shrink-0">{post.date}</div>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs border border-joji-border text-joji-muted px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
