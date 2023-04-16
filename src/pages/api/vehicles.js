import Pbf from "pbf";
import { FeedMessage } from "../../controllers/gtfs-realtime.browser.proto";
import { pburl } from "../../config";

export const processVehicles = (d) => {
  const features = d.map((el) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          el.vehicle.position.longitude,
          el.vehicle.position.latitude,
        ],
      },
      properties: {
        id: el.vehicle.vehicle.id,
      },
    };
  });

  return {
    type: "FeatureCollection",
    features,
  };
};

export const getVehicles = async (pburl) => {
  const response = await fetch(pburl).catch((e) => {
    console.error(e);
  });
  if (!response) return;
  if (response.ok) {
    const bufferRes = await response.arrayBuffer();
    const pbf = new Pbf(new Uint8Array(bufferRes));
    const obj = FeedMessage.read(pbf);
    return processVehicles(obj.entity);
  } else {
    console.error("error: ", response.status);
  }
};

export default async function handler(req, res) {
  const data = await getVehicles(pburl);
  res.status(200).json(data);
}
