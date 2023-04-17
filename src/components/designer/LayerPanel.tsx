import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "./Button";
import { LayerType, SourceType } from "../Map";

export type DesignerSourceType = SourceType & { name: string };

export const LayerPanel = ({
  sources,
  layers,
}: {
  sources: DesignerSourceType[];
  layers: LayerType[];
}) => {
  const [isOpen, setIsOpen] = useState<false | "layers">(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePanel = (value: false | "layers") => {
    setIsOpen(isOpen === value ? false : value);
  };
  return (
    <div>
      <button
        onClick={() => togglePanel("layers")}
        className={clsx(
          "absolute right-5 top-5 z-20 rounded p-2 px-6",
          isOpen !== "layers"
            ? "bg-blue-300 hover:bg-blue-200"
            : "bg-orange-400 hover:bg-orange-200"
        )}
      >
        <h3 className="text-lg">Layers</h3>
      </button>
      <div
        className={clsx(
          "absolute top-20 h-1/2 w-80 rounded bg-white shadow-lg transition-all duration-150",
          isOpen ? "right-5" : "-right-96"
        )}
      >
        <div className="p-3">
          <h3 className="text-lg">Sources</h3>
          {sources.length === 0
            ? "No sources uploaded"
            : sources.map((source) => <p key={source.id}>{source.name}</p>)}
        </div>
        <Button onClick={() => null}>Open Panel</Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title="This is the best"
      >
        <div>
          <div>These are my children</div>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};
