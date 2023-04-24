import { useEffect, useState } from "react";
import { LayerType } from "../Map";
import { SourceType } from "../Map";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";

export type DesignerSourceType = SourceType & {
  name: string;
  type:
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection"
    | undefined;
};
export type DesignMapValues = {
  sources: DesignerSourceType[];
  layers: LayerType[];
  layersPanelState: { isOpen: boolean; focus: "sources" | "layers" };
  modalState: { isOpen: boolean; focus: string };
  sourceModal: null | { id: string };
  showAddModal: boolean;
};

export type DesignStoreType = DesignMapValues & {
  addSource: (source: DesignerSourceType) => void;
  removeSource: (sourceId: string) => void;

  addLayer: (layer: LayerType) => void;
  removeLayerBySourceId: (sourceId: string) => void;
  removeLayerByLayerId: (layerId: string) => void;

  toggleLayersPanel: () => void;
  setLayerPanelFocus: (focus: "sources" | "layers") => void;

  toggleModal: () => void;
  setModalFocus: (focus: string) => void;

  setSourceModal: (sourceModal: DesignMapValues["sourceModal"]) => void;

  setShowAddModal: (event: boolean) => void;
};

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
  initialState: DesignStoreType
) => {
  const result = store(callback) as DesignStoreType;
  const [data, setData] = useState<DesignStoreType>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data ?? initialState;
};

export const initialMapState: DesignMapValues = {
  sources: [],
  layers: [],
  layersPanelState: { isOpen: false, focus: "sources" },
  modalState: { isOpen: false, focus: "settings" },
  sourceModal: null,
  showAddModal: false,
};

export const useDesignMapStore = create<DesignStoreType>()(
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
            const sources = state.sources.filter((s) => s.id !== sourceId);
            return { ...state, sources: sources };
          }),
        addLayer: (layer: LayerType) =>
          set((state) => {
            state.layers.push(layer);
            return { ...state, layers: state.layers };
          }),
        removeLayerBySourceId: (sourceId: string) =>
          set((state) => {
            const newLayers = state.layers.filter((l) => l.source !== sourceId);
            return { ...state, layers: newLayers };
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
        setSourceModal: (sourceModal: DesignMapValues["sourceModal"]) =>
          set((state) => {
            return { ...state, sourceModal };
          }),
        setShowAddModal: (event) =>
          set((state) => {
            return { ...state, showAddModal: event };
          }),
      }),
      {
        name: "map-design-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);

export const useMapStore = () =>
  // @ts-expect-error
  useStore(useDesignMapStore, (state) => state, initialMapState);
