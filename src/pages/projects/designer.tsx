import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Favicon } from "~/components/Favicon";
import { Map } from "~/components/Map";

const Projects = () => {
  const [files, setFiles] = useState<
    FeatureCollection<Geometry, GeoJsonProperties>[]
  >([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files?.[0] as Blob, "UTF-8");
    fileReader.onload = (e) => {
      setFiles([...files, e.target?.result as any]);
    };
  };
  return (
    <>
      <Head>
        <title>Mapbox layer Designer</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <main>
        <div className="flex h-screen w-screen">
          <div className="absolute left-5 top-5 z-20 grid max-w-xs gap-5 rounded bg-blue-900 p-6">
            <h2 className="text-lg text-white">
              Add some Geojson to the map and Let's make something fun!
            </h2>
            <input
              type="text"
              placeholder="add a url for geojson"
              className="rounded p-2"
            ></input>
            <input
              id="file-selector"
              hidden
              type="file"
              accept="application/JSON"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="file-selector"
              className="w-30 rounded-xl bg-blue-300 p-2 text-center transition-colors hover:cursor-pointer hover:bg-blue-200"
            >
              Add a File
            </label>
          </div>
          <Map
            className="flex h-screen w-screen"
            options={{
              center: [-97.93, 38.88],
              zoom: 3.55,
            }}
          ></Map>
          <div className="absolute bottom-10 right-5 ">
            <div className="grid gap-3">
              <button className="hover-right-bounce rounded-lg bg-blue-300 p-2">
                🍔 Back to Projects
              </button>
              <button className="hover-right-bounce rounded-lg bg-blue-300 p-2">
                💻 Work with Walter
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Projects;
