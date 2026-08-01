import { supabase } from "./supabaseClient";

export async function getBoard(id: number | string) {
  const { data, error } = await supabase
    .from("active_boards")
    .select("id, name, created_at")
    .limit(1)
    .eq("id", id);

  const board = data && data[0];

  return { board, error };
}
