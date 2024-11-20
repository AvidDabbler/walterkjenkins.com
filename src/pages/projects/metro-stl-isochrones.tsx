import Head from "next/head";
import {
  FillLayer,
  Layer,
  Map,
  MapProvider,
  Marker,
  Point,
  Source,
} from "react-map-gl";
import { Favicon } from "~/components/Favicon";
import { paths } from "~/config";
import Link from "next/link";
import { useEffect, useState } from "react";
const LandValueMap = ({}: {}) => {
  const [isochrone, setIsochrone] = useState(null);
  const [poi, setPoi] = useState([38.6249514, -90.2035715]);
  useEffect(() => {
    /* global fetch */
    fetch(
      `https://api.mapbox.com/isochrone/v1/mapbox/walking/${poi[1]},${poi[0]}?contours_minutes=15&polygons=true&access_token=pk.eyJ1Ijoid2FsdGVyaiIsImEiOiJjbHA5dW0xa3kwMHFyMmlxb3E3MjN1NXZqIn0.6pfIrIBF1NhDy9HbXoNxxw`
    )
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        setIsochrone(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, [poi]);
  const dataLayer: FillLayer = {
    id: "POI",
    type: "fill",
    // Use "iso" as the data source for this layer
    source: "POI",
    layout: {},
    paint: {
      // The fill color for the layer is set to a light purple
      "fill-color": "#5a3fc0",
      "fill-opacity": 0.3,
    },
  };
  return (
    <Map
      id="LandValueMap"
      mapboxAccessToken="pk.eyJ1Ijoid2FsdGVyaiIsImEiOiJjbHA5dW0xa3kwMHFyMmlxb3E3MjN1NXZqIn0.6pfIrIBF1NhDy9HbXoNxxw"
      initialViewState={{
        latitude: poi[0],
        longitude: poi[1],
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/navigation-night-v1"
    >
      <Source type="geojson" data={isochrone as any}>
        <Layer {...dataLayer} />
      </Source>
      <Marker
        longitude={poi[1] as number}
        latitude={poi[0] as number}
        color="red"
        draggable={true}
        onDragEnd={(e) => {
          const center = e.lngLat;
          setPoi([center.lat, center.lng]);
        }}
      />
    </Map>
  );
};

const DesignerPage = () => {
  return (
    <div>
      <Head>
        <title>St Louis Land Values</title>
        <meta
          name="description"
          content="VIsualizing St Louis Land values by concentration"
        />
        <meta
          property="og:image"
          content="/blog-images/3d-land-value/demo.gif"
        />
        <meta
          property="twitter:image"
          content="/blog-images/3d-land-value/demo.gif"
        />
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <div className="grid h-screen grid-cols-8">
        <div className="absolute left-6 top-6 z-50 grid max-w-[400px] gap-3 rounded-md bg-white p-6">
          <h1 className="text-xl font-bold">
            15 Minute Walking Distance metrics
          </h1>
          <p>
            This map shows how far you can get with a 15 minute walk from the
            marker. Drag the marker to update the isochrone to calculate the new
            walk distance.
          </p>
        </div>

        <MapProvider>
          <div className="flex h-screen w-screen">
            <LandValueMap />
          </div>
        </MapProvider>
      </div>
      <div className="absolute right-5 top-5">
        <div className="grid gap-3">
          <Link
            href={paths.projects}
            className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200"
          >
            🍔 Back to Projects
          </Link>
          <Link
            href={paths.contact}
            className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200"
          >
            💻 Work with Walter
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DesignerPage;
