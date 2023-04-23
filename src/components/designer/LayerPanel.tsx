"use-client";
import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "./Button";
import { LayerType, useMap } from "../Map";
import { DesignerSourceType, useDesignMapStore } from "./store";
import { RiMore2Fill } from "react-icons/ri";
import { Menu, Popover } from "@headlessui/react";
import bbox from "@turf/bbox";
import { LngLatBoundsLike } from "mapbox-gl";

const LayerPanel = () => {
  const map = useMap();
  const {
    sources,
    layers,
    modalState,
    layersPanelState,
    removeSource,
    removeLayerBySourceId,
    toggleLayersPanel,
    toggleModal,
  } = useDesignMapStore();

  const zoomTo = (id: string) => {
    const source = sources.find((source) => (source.id = id));
    if (!source) return;
    const bounds = bbox(source.data) as LngLatBoundsLike;
    map.fitBounds(bounds, { padding: 20 });
  };

  const deleteSource = (id: string) => {
    const source = sources.find((source) => (source.id = id));
    if (!source) return;
    map.removeSource(id);
    const removedLayers = layers.filter((layer) => layer.source === id);
    if(removedLayers) removedLayers.forEach((layer) => map.removeLayer(layer.id));
    removeSource(id);
    removeLayerBySourceId(id);
  };

  return (
    <div>
      <button
        onClick={() => toggleLayersPanel()}
        className={clsx(
          "absolute right-5 top-5 z-20 rounded p-2 px-6",
          layersPanelState.isOpen
            ? "bg-orange-400 hover:bg-orange-200"
            : "bg-blue-300 hover:bg-blue-200"
        )}
      >
        <h3 className="text-lg">Layers</h3>
      </button>
      <div
        className={clsx(
          "absolute top-20 h-1/2 w-80 rounded bg-white shadow-lg transition-all duration-150",
          layersPanelState.isOpen ? "right-5" : "-right-96"
        )}
      >
        <div className="p-3">
          <h3 className="text-lg">Sources</h3>
          <ul className="p-2">
            {sources.length === 0
              ? "No sources uploaded"
              : sources.map((source) => (
                  <li key={source.id}>
                    <div className="flex justify-between">
                      <span>{source.name}</span>
                      <Popover>
                        <Popover.Button className="rounded-full">
                          <RiMore2Fill />
                        </Popover.Button>
                        <Popover.Panel className="absolute right-3 mt-0 w-40 text-left shadow-2xl">
                          <div className="grid bg-gray-100 text-left">
                            <button
                              className="w-full rounded-md p-3 text-left hover:bg-blue-300"
                              onClick={() => zoomTo(source.id)}
                            >
                              Zoom to
                            </button>
                            <button
                              className="w-full rounded-md p-3 text-left hover:bg-blue-300"
                              onClick={() => deleteSource(source.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <Modal
        isOpen={modalState.isOpen}
        closeModal={toggleModal}
        title="This is the best"
      >
        <div>
          <div>These are my children</div>
          <Button onClick={toggleModal}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default LayerPanel;
