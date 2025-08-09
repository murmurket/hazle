import Link from 'next/link'
import { getAllLabPosts } from '@/lib/lab'

export const revalidate = 0; // or: export const dynamic = 'force-dynamic'
export const metadata = { title: 'Lab' }

export default function LabPage() {
  const posts = getAllLabPosts()
  return (
    <main className="max-w-4xl mx-auto pt-20 px-10">
      <h1 className="text-3xl font-bold mb-4">Lab</h1>
      <p className="text-gray-400 mb-8">
        A space to record experimental blogs, projects, and ideas.
      </p>

      <ul className="space-y-4">
        {posts.map(p => (
          <li key={p.slug} className="border border-white/10 rounded-xl p-4 hover:border-white/20">
            <Link href={`/lab/${p.slug}`} className="block">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <time className="text-sm text-gray-400">{p.date}</time>
              </div>
              {p.excerpt && <p className="text-gray-400 mt-2">{p.excerpt}</p>}
            </Link>
          </li>
        ))}
        {!posts.length && (
          <li className="text-gray-400">
            No posts yet. Add an MDX file under <code>src/content/lab</code>.
          </li>
        )}
      </ul>
    </main>
  )
}