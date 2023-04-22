import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import Head from "next/head";
import { useEffect } from "react";
import { Favicon } from "~/components/Favicon";
import { GeoJsonLayer, Map } from "~/components/Map";
import { AddFile } from "~/components/designer/AddFile";
import LayerPanel from "~/components/designer/LayerPanel";
import { SourceModal } from "~/components/designer/Modals";
import { useMapStore } from "~/components/designer/store";
import { paths } from "~/config";
import Link from "next/link";

const Designer = () => {
  const { layers, sources, addSource, addLayer, setSourceModal } =
    useMapStore();

  const uploadSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files?.[0] as Blob, "UTF-8");
    fileReader.onload = (file) => {
      if (
        file.target?.result &&
        typeof file.target?.result === "string" &&
        e.target.files &&
        e.target.files[0]
      ) {
        const id = (Math.random() * 1000).toString();
        const data = JSON.parse(file.target?.result) as FeatureCollection<
          Geometry,
          GeoJsonProperties
        >;
        const fileName = e.target.files[0].name;
        const geomType = data.features[0]?.geometry.type;
        if (!geomType || geomType === "GeometryCollection") return;
        const layerType = geomType.toLowerCase().includes("point")
          ? "circle"
          : "fill";
        addSource({
          data,
          name: fileName,
          type: data.features[0]?.geometry.type,
          id,
        });
        addLayer({
          id: `${fileName}_${(Math.random() * 1000).toString()}`,
          name: fileName,
          type: layerType,
          source: id,
        });
        setSourceModal({ id });
      }
    };
  };

  const addUrlSource = (url: string) => {};


  return (
    <>
      <Head>
        <title>Mapbox layer Designer</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <main>
        <div className="flex h-screen w-screen">
          <AddFile uploadSource={uploadSource} addUrlSource={addUrlSource} />
          <Map
            className="flex h-screen w-screen"
            options={{
              center: [-97.93, 38.88],
              zoom: 3.55,
            }}
          >
            {sources.map((source) => (
              <GeoJsonLayer
                source={source}
                layers={layers.filter((layer) => layer.source === source.id)}
              />
            ))}
          </Map>
          <LayerPanel sources={sources} layers={layers}></LayerPanel>
          <SourceModal />
          <div className="absolute bottom-10 right-5 ">
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
      </main>
    </>
  );
};
export default Designer;
