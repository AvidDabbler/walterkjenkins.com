import { useEffect, useRef, useState, createContext, useContext } from "react";
import mapboxgl from "mapbox-gl";
import type {
  CircleLayer,
  FillLayer,
  GeoJSONSourceRaw,
  HeatmapLayer,
  LineLayer,
  SymbolLayer,
  MapboxOptions,
  Map as MapBoxMap,
} from "mapbox-gl";
import type { LngLatLike, Map as MapType } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { FeatureCollection, GeoJsonProperties, Point } from "geojson";
import { mbAccessToken } from "~/config";
import type { GeoJSONSource } from "mapbox-gl";

export type SourceType = { id: string; data: GeoJSONSourceRaw["data"] };
export type LayerType = (
  | CircleLayer
  | FillLayer
  | LineLayer
  | SymbolLayer
  | HeatmapLayer
) & { name: string };

export function useMapbox({
  center,
  zoom = 17,
  onInit,
}: {
  center: LngLatLike;
  zoom?: number;
  onInit: (map: MapType) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapType>();
  const [loaded, setLoaded] = useState<boolean>();
  useEffect(() => {
    console.log("here");
    if (ref.current && !map && !loaded) {
      const map = new mapboxgl.Map({
        container: ref.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center,
        zoom,
      });
      setLoaded(true);
      setMap(map);
      map.on("load", () => onInit(map));
    }
  }, [ref, center, zoom, map]);
  return { ref, map };
}

const MapContext = createContext<MapType | null>(null);
const StyleContext = createContext<string | null | undefined>(null);

export const useMap = () => {
  const map = useContext(MapContext);
  if (!map) {
    throw new Error("useMap should be used in <Map> child components");
  }
  return map;
};

export const loadGeojson = ({
  map,
  layers,
  source,
}: {
  map: MapType;
  layers: LayerType[];
  source: SourceType;
}) => {
  if (!map.getSource(source.id)) {
    map.addSource(source.id, {
      type: "geojson",
      // Use a URL for the value for the `data` property.
      data: source.data,
    });
  }
  layers.forEach((layer) => map.addLayer(layer));
  return () => {
    map.removeSource(source.id);
    layers.forEach((layer) => map.removeLayer(layer.id));
  };
};

export const GeoJsonLayer = ({
  layers,
  source,
  refreshInterval,
}: {
  layers: LayerType[];
  source: SourceType;
  refreshInterval?: number;
}) => {
  const refresh = async () => {
    const _source = map.getSource(source.id) as GeoJSONSource;
    if (!_source || typeof source.data !== "string") return;
    const data = await fetch(source.data);
    const featureCollection = (await data.json()) as FeatureCollection<
      Point,
      GeoJsonProperties
    >;
    _source.setData(featureCollection);
  };
  const map = useMap();
  useEffect(() => {
    if (!source || map.getSource(source.id)) return;
    loadGeojson({ map, layers, source });
    let timer: undefined | NodeJS.Timer;
    if (refreshInterval) {
      // eslint-disable-next-line
      timer = setInterval(refresh, refreshInterval);
    }
    return () => clearInterval(timer);
  }, [map, layers, source]); // eslint-disable-line
  return null;
};

export const Map = ({
  options,
  children,
  className,
  onLoadFunction,
}: {
  children?: React.ReactNode;
  options: Partial<MapboxOptions>;
  className: string;
  onLoadFunction?: (m: MapType) => void;
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapBoxMap | null>(null);
  const [style, setStyle] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!mapContainer.current || map) return; // initialize map only once
    try {
      mapboxgl.accessToken = mbAccessToken ?? "";
      const _map = new mapboxgl.Map({
        container: mapContainer.current,
        fitBoundsOptions: { padding: 100, maxZoom: 18 },
        style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
        ...options,
      });

      const onLoad = () => {
        setMap(_map);
        setStyle(_map.getStyle().name);
        if (onLoadFunction) {
          onLoadFunction(_map);
        }
      };

      _map.on("load", onLoad);
      return () => {
        _map.off("load", onLoad);
      };
    } catch (e) {
      console.error(e);
    }
  }, [mapContainer, setMap, options, map]);

  useEffect(() => {
    if (!map) return;
    const onStyleChange = () => {
      setStyle(map.getStyle().name);
    };
    const onError = (e: any, ...rest: any) => {
      console.log("A error event occurred.", e, rest);
    };
    map.on("style.load", onStyleChange);

    map.on("error", onError);
    return () => {
      map.off("style.load", onStyleChange);
      map.off("error", onError);
    };
  }, [map]);

  return (
    <div className={className}>
      <MapContext.Provider value={map}>
        <StyleContext.Provider value={style}>
          <div className={className} ref={mapContainer} />
          {map && style && children}
        </StyleContext.Provider>
      </MapContext.Provider>
    </div>
  );
};
