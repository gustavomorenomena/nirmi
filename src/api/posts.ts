import { supabase } from "./supabaseClient";

export async function getPosts(boardId: string) {
  const { data: posts, error } = await supabase
    .from("active_posts")
    .select("id, created_at, title, content")
    .eq("board_id", boardId);
  return { posts, error };
}
