import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

// shadcn/ui primitives
import type { Post } from "@/hooks/useBoardPosts";
import { SquareArrowOutUpRight } from "lucide-react";
import { buttonVariants } from "./ui/button";

interface PostCardProps {
  post: Post;
  maxContentLength?: number;
}

export function PostCard({ post, maxContentLength = 120 }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasLongContent = (post.content?.length ?? 0) > maxContentLength;
  const displayContent =
    hasLongContent && !isExpanded
      ? `${post.content?.slice(0, maxContentLength)}...`
      : post.content;

  // Format relative date in French (e.g., "il y a 2 heures")
  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <div>
      {post.image_url && (
        <div className="relative aspect-square w-full bg-muted overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col pt-3">
        <h3 className="font-semibold leading-tight text-foreground">
          {post.title}
        </h3>
        <span className="text-[11px] text-muted-foreground capitalize">
          {formattedDate}
        </span>
      </div>

      <div className="py-1 text-sm text-foreground/90 leading-relaxed">
        <span>{displayContent}</span>
        {hasLongContent && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground inline-block transition-colors"
          >
            {isExpanded ? "Voir moins" : "Plus"}
          </button>
        )}
      </div>
      {post.external_link && (
        <a
          target="_blank"
          href={post.external_link}
          className={buttonVariants({
            variant: "link",
            size: "xs",
            className: "py-1",
          })}
        >
          Voir <SquareArrowOutUpRight />
        </a>
      )}
    </div>
  );
}
