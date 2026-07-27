import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl/mapbox";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  return (
    <div className="w-screen h-screen relative">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 3.8767, // Default: Montpellier / local center
          latitude: 43.6108,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mx-auto max-w-500">
          <button className="py-2 px-4 bg-green-600 text-white border-white border rounded-full">
            Post something 📌
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
