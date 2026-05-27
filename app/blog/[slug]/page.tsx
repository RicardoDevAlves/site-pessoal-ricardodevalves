import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { Tag } from '@/components/ui/Tag'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  try {
    const { meta } = getPostBySlug(slug)
    return { title: `${meta.title} — Ricardo Alves`, description: meta.description }
  } catch {
    return {}
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params

  let post: ReturnType<typeof getPostBySlug>
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  const { meta, content } = post
  const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(meta.date + 'T00:00:00'))

  return (
    <article className="py-24 px-6" aria-labelledby="post-titulo">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10">
          <time className="text-sm text-muted" dateTime={meta.date}>
            {dataFormatada}
          </time>
          <h1
            id="post-titulo"
            className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4 leading-tight"
          >
            {meta.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-6">{meta.description}</p>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-accent prose-code:text-accent prose-pre:bg-border/30 prose-pre:border prose-pre:border-border">
          <MDXRemote source={content} />
        </div>
      </div>
    </article>
  )
}
