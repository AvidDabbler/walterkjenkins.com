import React from "react";
import { useMapStore } from "./store";
import { Modal } from "../Modal";
import { Button } from "./Button";

export const SettingsModal = () => {
  const { modalState, toggleModal } = useMapStore();
  return (
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
  );
};

export const SourceModal = () => {
  const { sourceModal, setSourceModal } = useMapStore();
  return (
    <div>
      <Modal
        isOpen={!!sourceModal}
        closeModal={()=>setSourceModal(null)}
        title="This is the best"
      >
        <div>
          <div>These are my children</div>
          <Button onClick={()=>setSourceModal(null)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};
