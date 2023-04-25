import { GeoJsonLayer, Map as MapComponent } from "./Map";
import type { Map, GeoJSONSourceRaw, SymbolLayer } from "mapbox-gl";

export const BackgroundMap = () => {
  const initialMap = {
    loaded: false,
    lng: -90.31,
    lat: 38.63,
    zoom: 10.9,
    map: [],
    width: "100%",
    height: "100%",
  };

  const vehicles: {
    source: { id: string; data: GeoJSONSourceRaw["data"] };
    layers: [SymbolLayer & { name: string }];
  } = {
    source: {
      id: "vehicles",
      data: "api/vehicles",
    },
    layers: [
      {
        id: "vehicles",
        name: "vehicles",
        type: "symbol",
        layout: {
          "icon-image": "pulsing-dot",
        },
        source: "vehicles",
      },
    ],
  };

  const onAdd = (canvas: HTMLCanvasElement, size: number) => {
    canvas.width = size;
    canvas.height = size;
  };

  const onLoad = (map: Map) => {
    const size = 50;
    const canvas = document.createElement("canvas");
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8ClampedArray(size * size * 4),
      onAdd: onAdd(canvas, size),
      render: function () {
        const context = canvas.getContext("2d");
        if (!context) return;
        const duration = 1500;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.2;
        const outerRadius = (size / 1.5) * 0.4 * t + radius;

        // Draw the outer circle.
        context.clearRect(0, 0, size, size);
        context.beginPath();
        context.arc(size / 2, size / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 200, 200, 0.2)`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 100, 100, 0.5)";
        context.strokeStyle = "rgba(255, 100, 100, 0.5)";
        context.lineWidth = 1 - t;
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(0, 0, size, size).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
      },

      // Call once before every frame where the icon will be used.
    };

    map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
  };

  return (
    <MapComponent
      options={{
        style: "mapbox://styles/walterj/ckb1lvnmk06y11ilx1sf3uctj",
        center: [initialMap.lng, initialMap.lat],
        zoom: initialMap.zoom,
        interactive: false,
      }}
      onLoadFunction={onLoad}
      className="flex h-screen w-screen"
    >
      <GeoJsonLayer
        source={vehicles.source}
        layers={vehicles.layers}
        refreshInterval={10 * 1000}
      />
    </MapComponent>
  );
};
