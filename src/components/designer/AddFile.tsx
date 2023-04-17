import React from "react";

export const AddFile = ({
  uploadSource,
}: {
  uploadSource: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addUrlSource: (url: string) => void;
}) => {
  return (
    <div className="absolute left-5 top-5 z-20 grid max-w-xs gap-3 rounded bg-blue-900 p-6">
      <h2 className="text-lg text-white">
        Add some geojson to the map and Let's make something fun!
      </h2>
      <form className="grid gap-3">
        <input
          type="text"
          placeholder="Add a URL"
          className="rounded p-2"
        ></input>
        <input
          type="submit"
          className="w-30 rounded-lg bg-blue-300 p-2 text-center transition-all hover:cursor-pointer hover:shadow-xl duration-150 hover:bg-blue-200"
          title="Use URL Data"
        ></input>
      </form>
      <p className="text-center text-white">OR</p>
      <input
        id="file-selector"
        hidden
        type="file"
        accept="application/JSON"
        onChange={(e) => uploadSource(e)}
      />
      <label
        htmlFor="file-selector"
        className="w-30 rounded-lg bg-blue-300 p-2 text-center transition-all hover:cursor-pointer hover:shadow-xl duration-150 hover:bg-blue-200"
      >
        Add a File
      </label>
    </div>
  );
};
