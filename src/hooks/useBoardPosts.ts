import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export type Post = {
  id: string;
  title: string;
  content?: string;
  external_link?: string;
  image_url?: string;
  created_at: string;
};

export function useBoardPosts(boardId?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errors, setErrors] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setIsLoading(true);
      setErrors(null);

      const { data, error } = await supabase
        .from("active_posts")
        .select("id, title, content, external_link, image_url, created_at")
        .eq("board_id", boardId);

      if (!isMounted) return;

      if (error) {
        setErrors(error);
        setPosts([]);
      } else {
        setPosts(data ?? []);
      }

      setIsLoading(false);
    }

    if (boardId) {
      fetchPosts();
    }

    return () => {
      isMounted = false;
    };
  }, [boardId]);

  return { posts, errors, isLoading };
}
