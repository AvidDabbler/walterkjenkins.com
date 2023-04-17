'use-client'
import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "./Button";
import { LayerType } from "../Map";
import { DesignerSourceType, useDesignMapStore } from "./store";


const LayerPanel = ({
sources,
  layers,
}: {
  sources: DesignerSourceType[];
  layers: LayerType[];
}) => {
  const { modalState, layersPanelState, toggleLayersPanel, toggleModal } =
    useDesignMapStore();
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
          <ul>
            {sources.length === 0
              ? "No sources uploaded"
              : sources.map((source) => (
                  <li key={source.id}>{source.name}</li>
                ))}
          </ul>
        </div>
        <Button onClick={() => null}>Open Panel</Button>
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