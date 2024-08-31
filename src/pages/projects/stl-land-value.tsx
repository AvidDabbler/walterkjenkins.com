import Head from "next/head";
import { CSVLoader } from "@loaders.gl/csv";
import { load } from "@loaders.gl/core";
import Map, { Source } from "react-map-gl";
import { Favicon } from "~/components/Favicon";
import { paths } from "~/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AmbientLight,
  Color,
  DeckGL,
  GeoJsonLayer,
  HexagonLayer,
  LightingEffect,
  MapViewState,
  PickingInfo,
  PointLight,
} from "deck.gl";

type DataPoint = {
  HANDLE: string;
  area: number;
  tax_area: number;
  parcel_attributes_max: number;
  parcel_attributes_TaxAmt: number;
  parcel_attributes_LandValue: number;
  parcel_attributes_LandArea: number;
  lon: number;
  lat: number;
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 38.6318051,
  longitude: -90.2407939,
  zoom: 11,
  bearing: 22,
  pitch: 55,
};

const Designer = ({ data }: { data: DataPoint[] }) => {
  const [settings, setSettings] = useState({
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    touchPitch: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85,
  });

  function getTooltip({ object }: PickingInfo) {
    if (!object) {
      return null;
    }
    const count = object.points.length;

    console.log(object);
    return `\
      ${object.points.reduce((acc: number, cur: any) => {
        return acc + cur.source.tax_area;
      }, 0)}
     ${count} Parcels`;
  }

  const colorRange: Color[] = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78],
  ];
  useEffect(() => {
    console.log(data[0]);
  }, [data]);
  const layers = [
    new HexagonLayer({
      id: "heatmap",
      colorRange,
      coverage: 8,
      data,
      // @ts-ignore
      elevationScale: data && data.length ? 3 : 0,
      extruded: true,
      elevationRange: [0, 3000],
      getPosition: (d: any) => [d.lat, d.lon],
      //@ts-ignore
      getElevationValue: (points: any[]): number => {
        return points.reduce((acc, point) => acc + point.tax_area, 0) * 50;
      }, // Summing the values within the hexagon bin
      getColorValue: (points) =>
        //@ts-ignore
        points.reduce((acc, point) => acc + point.tax_area, 0),
      getPointRadius: 40,
      pickable: true,
      radius: 10,
      upperPercentile: 100,
      material: {
        ambient: 0.64,
        diffuse: 0.6,
        shininess: 32,
        specularColor: [51, 51, 51],
      },

      transitions: {
        elevationScale: 3000,
      },
    }),
  ];

  return (
    <>
      <Head>
        <title>St Louis Land Values</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <div className="flex overflow-hidden">
        <div className="flex h-screen w-screen overflow-hidden">
          {data.length > 0 && (
            <DeckGL
              layers={layers}
              effects={[lightingEffect]}
              initialViewState={INITIAL_VIEW_STATE}
              controller={true}
              getTooltip={getTooltip}
            >
              <Map
                reuseMaps
                mapboxAccessToken="pk.eyJ1Ijoid2FsdGVyaiIsImEiOiJjbHA5dW0xa3kwMHFyMmlxb3E3MjN1NXZqIn0.6pfIrIBF1NhDy9HbXoNxxw"
                mapStyle="mapbox://styles/mapbox/navigation-night-v1"
              />
            </DeckGL>
          )}
          {/* <Map */}
          {/*   initialViewState={initialViewState} */}
          {/*   {...settings} */}
          {/*   mapStyle="mapbox://styles/mapbox/navigation-night-v1" */}
          {/*   mapboxAccessToken="pk.eyJ1Ijoid2FsdGVyaiIsImEiOiJjbHA5dW0xa3kwMHFyMmlxb3E3MjN1NXZqIn0.6pfIrIBF1NhDy9HbXoNxxw" */}
          {/* > */}
          {/*   <Source */}
          {/*     id="parcels" */}
          {/*     type="geojson" */}
          {/*     data="/layers/stl_parcel_layer_pts.geojson" */}
          {/*     cluster={true} */}
          {/*     clusterMaxZoom={14} */}
          {/*     clusterRadius={50} */}
          {/*   ></Source> */}
          {/* </Map> */}
        </div>
        <div className="absolute bottom-10 right-5 ">
          <div className="grid gap-3">
            <Link
              href={paths.projects}
              className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200"
            >
              🍔 Back to Projects
            </Link>
            <Link
              href={"/"}
              className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200"
            >
              💻 Work with Walter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const DesignerPage = () => {
  const [data, setData] = useState<any[]>([]);
  const DATA_URL =
    "https://walterkjenkins-com-git-main-aviddabblers-projects.vercel.app/layers/stl_parcel_layer_pts.csv";
  const loadIt = async () => {
    const _data = (await load(DATA_URL, CSVLoader)).data as DataPoint[];
    setData(_data);
  };

  useEffect(() => {
    loadIt();
  }, []);

  return <Designer data={data} />;
};

export default DesignerPage;
