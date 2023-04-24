import React, { Fragment } from "react";
import { useMap } from "../Map";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { useMapStore } from "./store";
import bbox from "@turf/bbox";
import { LngLatBoundsLike } from "mapbox-gl";
import { Modal } from "../Modal";
import type { CircleLayer, FillLayer, LineLayer } from "mapbox-gl";
import randomcolor from "randomcolor";

export const AddFile = () => {
  const map = useMap();
  const { addSource, addLayer, setSourceModal, showAddModal, setShowAddModal } =
    useMapStore();

  const paintProperties = (
    layerType: "circle" | "line" | "fill"
  ): CircleLayer["paint"] | FillLayer["paint"] | LineLayer["paint"] => {
    switch (layerType) {
      case "circle":
        return {
          "circle-color": randomcolor(),
          "circle-radius": 5,
          "circle-stroke-color": randomcolor(),
          "circle-stroke-width": 1,
        };
      case "fill":
        return {
          "fill-color": randomcolor(),
          "fill-outline-color": randomcolor(),
        };
      case "line":
        return {
          "line-color": randomcolor(),
          "line-width": 2,
        };
    }
  };

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
          : geomType.toLowerCase().includes("polygon")
          ? "fill"
          : "line";
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
          paint: paintProperties(layerType),
        });
        setSourceModal({ id });
        const bounds = bbox(data) as LngLatBoundsLike;
        map.fitBounds(bounds, { padding: 20 });
        setShowAddModal(false);
      }
    };
  };

  const addUrlSource = (url: string) => {};

  return (
    <Modal
      isOpen={showAddModal}
      closeModal={() => setShowAddModal(false)}
      title="Add a Geojson URL or file to the map"
    >
      <div className=" z-20 grid gap-3 p-6">
        <form className="grid gap-5">
          <input
            type="text"
            placeholder="Add a URL"
            className="rounded border border-gray-400 p-2"
          ></input>
          <button
            type="submit"
            className="w-30 rounded-lg bg-blue-300 p-2 text-center transition-all duration-150 hover:cursor-pointer hover:bg-blue-200 hover:shadow-xl"
            title="Use URL Data"
          >
            Use URL Data
          </button>
        </form>
        <p className="text-center text-black">OR</p>
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
    </Modal>
  );
};
