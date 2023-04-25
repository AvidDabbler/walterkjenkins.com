import Head from "next/head";
import { Favicon } from "~/components/Favicon";
import { GeoJsonLayer, Map } from "~/components/Map";
import { AddFile } from "~/components/designer/AddFile";
import LayerPanel from "~/components/designer/LayerPanel";
import { SourceModal } from "~/components/designer/Modals";
import { useMapStore } from "~/components/designer/store";
import { paths } from "~/config";
import Link from "next/link";
import { RiAddCircleFill } from "react-icons/ri";

const Designer = () => {
  const { layers, sources, setShowAddModal } = useMapStore();

  return (
    <>
      <Map
        className="flex h-screen w-screen"
        options={{
          center: [-97.93, 38.88],
          zoom: 3.55,
        }}
      >
        <AddFile />
        {sources.map((source) => (
          <GeoJsonLayer
            source={source}
            layers={layers.filter((layer) => layer.source === source.id)}
          />
        ))}
        <button
          onClick={() => setShowAddModal(true)}
          className={
            "absolute bottom-6 left-6 rounded-full bg-blue-600 p-3 shadow-2xl transition-colors hover:bg-blue-300"
          }
        >
          <RiAddCircleFill className="h-8 w-8 text-white" />
        </button>
        <LayerPanel />
      </Map>
      <SourceModal />
      <div className="absolute bottom-10 right-5 ">
        <div className="grid gap-3">
          <Link
            href={paths.projects}
            className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200"
          >
            🍔 Back to Projects
          </Link>
          <Link
            href={paths.contact}
            className="hover-right-bounce rounded-lg bg-blue-300 p-2 hover:bg-blue-200"
          >
            💻 Work with Walter
          </Link>
        </div>
      </div>
    </>
  );
};
export default Designer;
