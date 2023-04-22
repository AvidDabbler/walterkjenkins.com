import React from "react";
import { useMap } from "../Map";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { useMapStore } from "./store";
import bbox from "@turf/bbox";

export const AddFile = () => {
  const map = useMap();
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
        const bounds = bbox(data);
        map.fitBounds(bounds, { padding: 20 });
      }
    };
  };

  const addUrlSource = (url: string) => {};

  return (
    <div className="absolute left-5 top-5 z-20 grid max-w-xs gap-3 rounded bg-blue-900 p-6">
      <h2 className="text-lg text-white">
        Add some geojson to the map and Let's make something fun!
      </h2>
      <form className="grid gap-3">
        <input
          type="text"
          placeholder="Add a URL"
          className="rounded p-2"
        ></input>
        <input
          type="submit"
          className="w-30 rounded-lg bg-blue-300 p-2 text-center transition-all duration-150 hover:cursor-pointer hover:bg-blue-200 hover:shadow-xl"
          title="Use URL Data"
        ></input>
      </form>
      <p className="text-center text-white">OR</p>
      <input
        id="file-selector"
        hidden
        type="file"
        accept="application/JSON"
        onChange={(e) => uploadSource(e)}
      />
      <label
        htmlFor="file-selector"
        className="w-30 rounded-lg bg-blue-300 p-2 text-center transition-all duration-150 hover:cursor-pointer hover:bg-blue-200 hover:shadow-xl"
      >
        Add a File
      </label>
    </div>
  );
};
