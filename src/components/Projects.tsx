import React from "react";
import Image from "next/image";
import Link from "next/link";
import MapDesigner from "../assets/map-designer.png";
import TrainPicture from "../assets/train.jpg";

export function Projects() {
  return (
    <>
      <div className="bg-blue topo flex h-full min-h-screen w-full flex-col gap-12 py-32">
        <div id="app" className="w-100">
          <div className=" w-100 zi100"></div>
          <div className="m-auto grid w-5/6 gap-12 pt-40 text-3xl">
            <h2 className="text-center text-3xl text-white">Projects</h2>
            <div className="group grid gap-12 md:flex">
              <Image
                src={MapDesigner}
                className="mx-auto h-64 w-64 rounded-md ring-4 drop-shadow-lg transition-all hover:h-[17rem] hover:w-[17rem] lg:h-[23rem] lg:w-[23rem] lg:hover:h-96 lg:hover:w-96"
                alt="profile photo"
              ></Image>
              <div className="my-auto grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-6 md:pr-6">
                <Link
                  href="projects/designer"
                  className="text-orange-400 hover:text-orange-600"
                >
                  Map Designer
                </Link>
                <p className="text-2xl leading-normal text-gray-200">
                  A work in progress to upload and display geojson data in the
                  browser
                </p>
              </div>
            </div>
            <div className="group grid gap-12 md:flex">
              <Image
                src={TrainPicture}
                className="mx-auto h-64 w-64 rounded-md ring-4 drop-shadow-lg transition-all hover:h-[17rem] hover:w-[17rem] lg:h-[23rem] lg:w-[23rem] lg:hover:h-96 lg:hover:w-96"
                alt="profile photo"
              ></Image>
              <div className="my-auto grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-6 md:pr-6">
                <Link
                  href="https://transit.chat/gtfs-to-geojson"
                  className="text-orange-400 hover:text-orange-600"
                >
                  GTFS to GeoJSON Converter
                </Link>
                <p className="text-2xl leading-normal text-gray-200">
                  A simple tool to create geojson from GTFS files to build
                  transit mapping applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
