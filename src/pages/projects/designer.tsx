import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import Head from "next/head";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { Favicon } from "~/components/Favicon";
import { LayerType, Map } from "~/components/Map";
import { AddFile } from "~/components/designer/AddFile";
import {
  DesignerSourceType,
  LayerPanel,
} from "~/components/designer/LayerPanel";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type DesignMapStore = {
  sources: DesignerSourceType[];
  layers: LayerType[];
  addSource: (source: DesignerSourceType) => void;
  removeSource: (sourceId: string) => void;
  addLayer: (layer: LayerType) => void;
  removeLayerBySourceId: (sourceId: string) => void;
  removeLayerByLayerId: (layerId: string) => void;
};

const useDesignMapStore = create<DesignMapStore>()(
  devtools(
    persist(
      (set) => ({
        sources: [],
        layers: [],
        addSource: (source: DesignerSourceType) =>
          set((state) => {
            state.sources.push(source);
            return { ...state, sources: state.sources };
          }),
        removeSource: (sourceId: string) =>
          set((state) => {
            state.sources.filter((s) => s.id !== sourceId);
            return { ...state, sources: state.sources };
          }),
        addLayer: (layer: LayerType) =>
          set((state) => {
            state.layers.push(layer);
            return { ...state, layers: state.layers };
          }),
        removeLayerBySourceId: (sourceId: string) =>
          set((state) => {
            state.layers.filter((l) => l.id !== sourceId);
            return { ...state, layers: state.layers };
          }),
        removeLayerByLayerId: (layerId: string) =>
          set((state) => {
            state.layers.filter((l) => l.id !== layerId);
            return { ...state, layers: state.layers };
          }),
      }),
      {
        name: "map-design-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);

const Designer = () => {
  // const [sources, setSources] = useState<DesignerSourceType[]>([]);
  // const [layers, setLayers] = useState<LayerType[]>([]);
  const { layers, sources, addSource } = useDesignMapStore();

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
