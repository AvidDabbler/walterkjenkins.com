import Head from "next/head";
import { CSVLoader } from "@loaders.gl/csv";
import { load } from "@loaders.gl/core";
import { Map, MapProvider } from "react-map-gl";
import { Favicon } from "../../components/Favicon";
import React, { Fragment, useEffect, useState } from "react";
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
  latitude: 29.42708842035446,
  longitude: -98.52769208677068,
  zoom: 12,
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
        return acc + cur.source.SUM_VPA;
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
      coverage: 5,
      data,
      // @ts-ignore
      elevationScale: data && data.length ? 3 : 0,
      extruded: true,
      elevationRange: [0, 3000],
      getPosition: (d: any) => [d.lon, d.lat],
      //@ts-ignore
      getElevationValue: (points: any[]): number => {
        return points.reduce((acc, point) => acc + point.SUM_VPA, 0) * 50;
      }, // Summing the values within the hexagon bin
      getColorValue: (points) =>
        //@ts-ignore
        points.reduce((acc, point) => acc + point.SUM_VPA, 0),
      getPointRadius: 20,
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
    <Fragment>
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
    </Fragment>
  );
};

const DesignerPage = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const DATA_URL = "/layers/san_antonio_parcel_layer_pts.csv";
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
        <title>San Antonio Land Values</title>
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
