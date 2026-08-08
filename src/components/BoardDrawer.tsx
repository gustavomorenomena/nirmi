import useIsMobile from "@/hooks/use-is-mobile";
import { useBoardPosts } from "@/hooks/useBoardPosts";
import type { Board } from "@/hooks/useBoards";
import { File, SquareArrowOutUpRight } from "lucide-react";
import { PostCard } from "./PostCard";
import { buttonVariants } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export function BoardDrawer({
  board,
  setBoard,
}: {
  board?: Board;
  setBoard?: React.Dispatch<React.SetStateAction<Board | undefined>>;
}) {
  const { isMobile } = useIsMobile();
  const { posts, isLoading } = useBoardPosts(board?.id);

  return (
    <Drawer
      open={!!board}
      onOpenChange={(open) => {
        if (!open && setBoard) {
          setBoard(undefined);
        }
      }}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "left"}
    >
      {board && (
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{board.name}</DrawerTitle>
            {board.description && (
              <DrawerDescription>{board.description}</DrawerDescription>
            )}
            {board.external_link && (
              <a
                target="_blank"
                href={board.external_link}
                className={buttonVariants({ variant: "link" })}
              >
                Site web <SquareArrowOutUpRight />
              </a>
            )}
          </DrawerHeader>
          <div className="flex-1 scroll-fade overflow-y-auto p-4">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ) : posts.length ? (
              <div className="space-y-5">
                {posts.map((post, index) => (
                  <>
                    {index > 0 && <Separator />}
                    <PostCard key={post.id} post={post} />
                  </>
                ))}
              </div>
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia>
                    <File />
                  </EmptyMedia>
                  <EmptyTitle>Pas encore d'annonces</EmptyTitle>
                  <EmptyDescription>
                    Aucune annonce trouvé pour ce panneau d'affichage
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
