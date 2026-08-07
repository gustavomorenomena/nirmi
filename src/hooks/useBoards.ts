import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export interface Board {
  id: string;
  name: string;
  lat: number;
  lng: number;
  external_link: string | null;
}

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [errors, setErrors] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchBoards() {
      setIsLoading(true);
      setErrors(null);

      const { data, error } = await supabase
        .from("active_boards")
        .select("id, name, lat, lng, external_link");

      if (!isMounted) return;

      if (error) {
        setErrors(error);
        setBoards([]);
      } else {
        setBoards(data ?? []);
      }

      setIsLoading(false);
    }

    fetchBoards();

    return () => {
      isMounted = false;
    };
  }, []);

  return { boards, errors, isLoading };
}
