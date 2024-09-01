import Head from "next/head";
import { CSVLoader } from "@loaders.gl/csv";
import { load } from "@loaders.gl/core";
import { Map, MapProvider } from "react-map-gl";
import { Favicon } from "~/components/Favicon";
import { paths } from "~/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AmbientLight,
  DeckGL,
  HexagonLayer,
  LightingEffect,
  MapViewState,
  PickingInfo,
  PointLight,
} from "deck.gl";
import { useMap } from "react-map-gl";

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
const PARCEL_LAYER_ID = "heatmap";
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

const LandValueMap = ({
  data,
  setSelectedFeatures,
}: {
  data: DataPoint[];
  setSelectedFeatures: (e: any) => void;
}) => {
  function getTooltip({ object }: PickingInfo) {
    if (!object) {
      return null;
    }
    const count = object.points.length;

    return `\
      ${object.points.reduce((acc: number, cur: any) => {
        return acc + cur.source.tax_area;
      }, 0)}
     ${count} Parcels`;
  }

  const colorRange: [number, number, number, number][] = [
    [1, 102, 139, 100], // Transparent color (fully transparent)
    [1, 132, 159, 250], // Transparent color (fully transparent)
    [1, 152, 189, 255], // Opaque colors
    [32, 190, 198, 255],
    [129, 240, 193, 255],
    [211, 252, 180, 255],
    [254, 245, 179, 255],
    [254, 214, 130, 255],
    [254, 188, 106, 255],
    [254, 144, 81, 255],
    [231, 88, 79, 255],
    [209, 55, 78, 255],
  ];

  const layers = [
    new HexagonLayer({
      id: PARCEL_LAYER_ID,
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
      onClick: (e) => {
        setSelectedFeatures(e.object.points);
        return true;
      },
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
      {data.length > 0 && (
        <DeckGL
          layers={layers}
          effects={[lightingEffect]}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          _pickable={true}
          getTooltip={getTooltip}
        >
          <Map
            id="LandValueMap"
            reuseMaps
            mapboxAccessToken="pk.eyJ1Ijoid2FsdGVyaiIsImEiOiJjbHA5dW0xa3kwMHFyMmlxb3E3MjN1NXZqIn0.6pfIrIBF1NhDy9HbXoNxxw"
            mapStyle="mapbox://styles/mapbox/navigation-night-v1"
          ></Map>
        </DeckGL>
      )}
    </>
  );
};

const DesignerPage = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const DATA_URL = "/layers/stl_parcel_layer_pts.csv";
  const loadIt = async () => {
    const _data = (await load(DATA_URL, CSVLoader)).data as DataPoint[];
    setData(_data);
  };

  useEffect(() => {
    loadIt();
  }, []);

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
      <div className="grid h-36 w-36 grid-cols-8">
        <MapProvider>
          <div className="flex w-36">
            <LandValueMap
              data={data}
              setSelectedFeatures={setSelectedFeatures}
            />
            ;
          </div>
          <ClickHandler setSelectedFeatures={setSelectedFeatures} />
        </MapProvider>
      </div>
      <div className="absolute bottom-0 w-screen ">
        <aside className="grid h-[30vh] min-h-[200px] w-full grid-rows-8  overflow-auto rounded-lg bg-white py-3 shadow-lg">
          <h2 className="flex items-center px-6 text-2xl font-bold">
            Selected Properties
          </h2>
          <table className="sticky mx-3 table-auto grid-rows-8 text-left">
            <thead>
              <tr>
                <th>Address</th>
                <th>Owner</th>
                <th>Tax Amount</th>
              </tr>
            </thead>
            <tbody className="row-span-7 h-full ">
              {selectedFeatures.map((el, i) => {
                return (
                  <tr key={i}>
                    <td>{el.source.address}</td>
                    <td>{el.source.OwnerName}</td>
                    <td>{el.source.TaxAmt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {selectedFeatures.length == 0 && (
            <div className="flex h-full items-center px-6 font-medium">
              <div>Click the map to add items to this table</div>
            </div>
          )}
        </aside>
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
            href={"/"}
            className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200"
          >
            💻 Work with Walter
          </Link>
        </div>
      </div>
      <div className="absolute left-5 top-5 drop-shadow-lg">
        <div className="grid max-w-[35vw] gap-3 rounded-lg bg-white p-6">
          <h1 className="text-2xl font-bold">What is this❓</h1>
          <p>
            This is the representation of the amount of taxes that are paid over
            the the amount of land that it takes up in the City of St Louis.
          </p>
          <h2 className="text-2xl">But why?</h2>
          <p>
            When you start to look at how much taxes are spent on properties you
            are accomidating for how much infrastructure is being used to
            support the people and buisnesses for that area.
          </p>
          <div>
            <a
              href="https://www.urbanthree.com/services/public-asset-valuation/"
              className="hover-right-bounce rounded-lg bg-blue-300 p-2 text-white hover:bg-blue-200"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClickHandler = ({
  setSelectedFeatures,
}: {
  setSelectedFeatures: (e: any) => void;
}) => {
  const { LandValueMap: map } = useMap();

  return null;
};
export default DesignerPage;
