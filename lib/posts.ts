import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  author?: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.(mdx|md)$/, '')
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || '',
        tags: data.tags || [],
        author: data.author || 'Joji + Claw',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const mdxPath = path.join(postsDir, `${slug}.mdx`)
  const mdPath = path.join(postsDir, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      tags: data.tags || [],
      author: data.author || 'Joji + Claw',
    },
    content,
  }
}
