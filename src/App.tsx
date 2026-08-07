import { type Board, useBoards } from "@/hooks/useBoards";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { BoardDrawer } from "./components/BoardDrawer";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const { boards } = useBoards();
  const [selectedBoard, setSelectedBoard] = useState<Board>();

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
              color="red"
            />
          ))}
        </Map>
        <BoardDrawer board={selectedBoard} setBoard={setSelectedBoard} />
      </main>
    </>
  );
}

export default App;
