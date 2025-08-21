import { getPostsPaginated, getCategoryBySlug } from "@/lib/wordpress";
import { PostFeedItem } from "@/components/news/post-feed-item";
import { HOME_SECTIONS } from "@/home.config";

export const dynamic = "auto";
export const revalidate = 600;

export default async function Home() {
  const { data: posts } = await getPostsPaginated(1, 10);
  // Preload categories mapping for quick lookup when rendering section links
  const sectionCategories = await Promise.all(
    HOME_SECTIONS.map(async (s) => ({
      label: s.label,
      slug: s.slug,
      id: (await getCategoryBySlug(s.slug))?.id,
    }))
  );

  return (
    <main>

      {/* Feed */}
      <div className="mx-auto max-w-3xl min-h-[60vh]">
        <ul className="divide-y">
          {posts.map((post) => (
            <PostFeedItem key={post.id} post={post} />
          ))}
        </ul>
      </div>

      {/* Sections grid */}
      <div className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="mt-8 mb-3 text-base font-semibold">Explore by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {sectionCategories.map((c) => (
            <a
              key={c.slug}
              href={c.id ? `/posts?category=${c.id}` : `/posts`}
              className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
