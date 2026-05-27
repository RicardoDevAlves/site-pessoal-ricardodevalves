import Link from 'next/link'
import { Tag } from '@/components/ui/Tag'
import type { PostMeta } from '@/lib/posts'

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.date + 'T00:00:00'))

  return (
    <article className="flex flex-col gap-3 p-6 rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-200">
      <time className="text-xs text-muted" dateTime={post.date}>
        {dataFormatada}
      </time>
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-lg font-semibold font-display text-foreground hover:text-accent transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-sm text-muted leading-relaxed">{post.description}</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {post.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </article>
  )
}
