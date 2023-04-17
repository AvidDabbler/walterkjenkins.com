import { useEffect, useState } from "react";
import { LayerType } from "../Map";
import { SourceType } from "../Map";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";

export type DesignerSourceType = SourceType & { name: string };


export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
  initialState: any
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data ?? initialState;
};

export type DesignMapValues = {
  sources: DesignerSourceType[];
  layers: LayerType[];
  layersPanelState: { isOpen: boolean; focus: "sources" | "layers" };
  modalState: { isOpen: boolean; focus: string };
};

export type DesignMapStore = DesignMapValues & {
  addSource: (source: DesignerSourceType) => void;
  removeSource: (sourceId: string) => void;

  addLayer: (layer: LayerType) => void;
  removeLayerBySourceId: (sourceId: string) => void;
  removeLayerByLayerId: (layerId: string) => void;

  toggleLayersPanel: () => void;
  setLayerPanelFocus: (focus: "sources" | "layers") => void;

  toggleModal: () => void;
  setModalFocus: (focus: string) => void;
};

export const initialMapState: DesignMapValues = {
  sources: [],
  layers: [],
  layersPanelState: { isOpen: false, focus: "sources" },
  modalState: { isOpen: false, focus: "" },
};

export const useDesignMapStore = create<DesignMapStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialMapState,
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
        toggleLayersPanel: () =>
          set((state) => {
            return {
              ...state,
              layersPanelState: {
                ...state.layersPanelState,
                isOpen: !state.layersPanelState.isOpen,
              },
            };
          }),
        setLayerPanelFocus: (focus) =>
          set((state) => {
            return {
              ...state,
              layersPanelState: { ...state.layersPanelState, focus },
            };
          }),
        toggleModal: () =>
          set((state) => {
            return {
              ...state,
              modalState: {
                ...state.modalState,
                isOpen: !state.modalState.isOpen,
              },
            };
          }),
        setModalFocus: (focus) =>
          set((state) => {
            return { ...state, modalState: { ...state.modalState, focus } };
          }),
      }),
      {
        name: "map-design-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);