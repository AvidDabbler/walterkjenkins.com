import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import Head from "next/head";
import { useEffect } from "react";
import { Favicon } from "~/components/Favicon";
import { Map } from "~/components/Map";
import { AddFile } from "~/components/designer/AddFile";
import LayerPanel from "~/components/designer/LayerPanel";
import { useMapStore } from "~/components/designer/store";

const Designer = () => {
  const { layers, sources, addSource } = useMapStore();

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
        addSource({
          data: JSON.parse(file.target?.result) as FeatureCollection<
            Geometry,
            GeoJsonProperties
          >,
          name: e.target.files[0].name,
          id: (Math.random() * 1000).toString(),
        });
      }
    };
  };

  const addUrlSource = (url: string) => {};

  const closeModal = () => null;

  useEffect(() => {
    console.log({ sources });
  }, [sources]);

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
          ></Map>
          <LayerPanel sources={sources} layers={layers}></LayerPanel>

          <div className="absolute bottom-10 right-5 ">
            <div className="grid gap-3">
              <button className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200">
                🍔 Back to Projects
              </button>
              <button className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200">
                💻 Work with Walter
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Designer;
