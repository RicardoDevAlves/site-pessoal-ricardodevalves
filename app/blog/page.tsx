import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'

export const metadata = {
  title: 'Blog — Ricardo Alves',
  description: 'Artigos sobre desenvolvimento back-end, performance e boas práticas.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section aria-labelledby="blog-titulo" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1
          id="blog-titulo"
          className="font-display text-3xl font-bold text-foreground mb-12"
        >
          Blog
        </h1>
        {posts.length === 0 ? (
          <p className="text-muted">Nenhum post ainda.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
