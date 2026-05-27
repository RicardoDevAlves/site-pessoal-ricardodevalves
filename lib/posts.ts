import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const { data } = matter(fs.readFileSync(path.join(postsDir, filename), 'utf-8'))
      return { slug, ...data } as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const file = fs.readFileSync(path.join(postsDir, `${slug}.mdx`), 'utf-8')
  const { data, content } = matter(file)
  return { meta: { slug, ...data } as PostMeta, content }
}
