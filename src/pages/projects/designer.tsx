import Head from "next/head";
import { Favicon } from "~/components/Favicon";
import { GeoJsonLayer, Map } from "~/components/Map";
import { AddFile } from "~/components/designer/AddFile";
import LayerPanel from "~/components/designer/LayerPanel";
import { SourceModal } from "~/components/designer/Modals";
import { useMapStore } from "~/components/designer/store";
import { paths } from "~/config";
import Link from "next/link";

const Designer = () => {
  const { layers, sources } = useMapStore();

  return (
    <>
      <Head>
        <title>Mapbox layer Designer</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <main>
        <div className="flex h-screen w-screen">
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
        </div>
      </main>
    </>
  );
};
export default Designer;
