import { Map } from "./Map";

export const BackgroundMap = () => {
  const initialMap = {
    loaded: false,
    lng: -90.21,
    lat: 38.53,
    zoom: 10.9,
    map: [],
    width: "100%",
    height: "100%",
  };

  return (
    <Map
      options={{
        style: "mapbox://styles/walterj/ckb1lvnmk06y11ilx1sf3uctj",
        center: [initialMap.lng, initialMap.lat],
        zoom: initialMap.zoom,
        interactive: false,
      }}
      className=""
    ></Map>
  );
};
