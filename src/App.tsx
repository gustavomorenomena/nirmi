import { buttonVariants } from "@/components/ui/button";
import { type Board, useBoards } from "@/hooks/useBoards";
import { SquareArrowOutUpRight } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./components/ui/drawer";
import useIsMobile from "./hooks/use-is-mobile";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const { boards } = useBoards();
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const { isMobile } = useIsMobile();

  return (
    <>
      <main className="h-dvh w-screen overflow-hidden">
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            longitude: 3.8767, // Default: Montpellier / local center
            latitude: 43.6108,
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          reuseMaps
        >
          {boards.map((board) => (
            <Marker
              key={board.id}
              latitude={board.lat}
              longitude={board.lng}
              anchor="bottom"
              onClick={() => {
                setSelectedBoard(board);
              }}
            />
          ))}
        </Map>
      </main>
      <Drawer
        open={!!selectedBoard}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedBoard(undefined);
          }
        }}
        showSwipeHandle={isMobile}
        swipeDirection={isMobile ? "down" : "left"}
      >
        {selectedBoard && (
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{selectedBoard.name}</DrawerTitle>
              {selectedBoard.description && (
                <DrawerDescription>
                  {selectedBoard.description}
                </DrawerDescription>
              )}
              {selectedBoard.external_link && (
                <a
                  target="_blank"
                  href={selectedBoard.external_link}
                  className={buttonVariants({ variant: "link" })}
                >
                  Site web <SquareArrowOutUpRight />
                </a>
              )}
            </DrawerHeader>
            <div className="p-4">{/* Content here */}</div>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
}

export default App;
