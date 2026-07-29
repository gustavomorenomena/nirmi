import { createFileRoute } from "@tanstack/react-router";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl/mapbox";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function RouteComponent() {
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
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
