import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl/mapbox";
import { useBoards } from "./hooks/useBoards";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const { boards } = useBoards();

  return (
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
        {boards.map(({ id, lat, lng }) => (
          <Marker key={id} latitude={lat} longitude={lng} anchor="bottom" />
        ))}
      </Map>
    </main>
  );
}

export default App;
