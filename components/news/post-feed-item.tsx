import Image from "next/image";
import Link from "next/link";
import { Share2 } from "lucide-react";

import type { Post } from "@/lib/wordpress.d";
import { getFeaturedMediaById, getCategoryById } from "@/lib/wordpress";
import { cn } from "@/lib/utils";

type PostFeedItemProps = {
  post: Post;
  className?: string;
};

export async function PostFeedItem({ post, className }: PostFeedItemProps) {
  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const category = post.categories?.[0]
    ? await getCategoryById(post.categories[0])
    : null;

  return (
    <li className={cn("border-b last:border-b-0", className)}>
      <Link href={`/posts/${post.slug}`} className="block p-4">
        <div className="flex items-stretch gap-3">
          <div className="flex-1 min-w-0">
            <div
              className="text-base font-semibold leading-5"
              dangerouslySetInnerHTML={{
                __html: post.title?.rendered || "Untitled",
              }}
            />

            {post.excerpt?.rendered && (
              <p
                className="mt-2 text-sm text-muted-foreground line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html:
                    post.excerpt.rendered
                      .replace(/<[^>]*>/g, " ")
                      .split(" ")
                      .slice(0, 28)
                      .join(" ") + "…",
                }}
              />
            )}

            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                {category?.name || "General"}
              </span>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="relative shrink-0 w-28 h-20 overflow-hidden rounded-md border bg-muted">
            {media?.source_url ? (
              <Image
                src={media.source_url}
                alt={post.title?.rendered || "Thumbnail"}
                fill
                sizes="(max-width: 640px) 112px, 160px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                No image
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}


