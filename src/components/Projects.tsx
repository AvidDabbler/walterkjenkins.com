import React from "react";
import Image from "next/image";
import Link from "next/link";
import SimpleTransitSite from "../assets/simple-transit-site.png";
import TransitIntensity from "../assets/transit-intensity.png";
import TrainPicture from "../assets/train.jpg";
import LandValueDemo from "../../public/blog-images/3d-land-value/demo.gif";
import CallCenter from "../../public/images/call-center.gif";

export const ExternalProject = ({
  link,
  name,
  about,
  image,
}: {
  link: string;
  about: string;
  name: string;
  image: string;
}) => {
  return (
    <div className="group grid gap-12 md:flex">
      <Image
        src={image}
        className="mx-auto h-64 w-64 rounded-md ring-4 drop-shadow-lg transition-all hover:h-[17rem] hover:w-[17rem] lg:h-[23rem] lg:w-[23rem] lg:hover:h-96 lg:hover:w-96"
        alt="profile photo"
      ></Image>
      <div className="my-auto grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-6 md:pr-6">
        <a href={link} className="text-orange-400 hover:text-orange-600">
          {name}
        </a>
        <p className="text-2xl leading-normal text-gray-200">{about}</p>
      </div>
    </div>
  );
};

export function Projects() {
  return (
    <>
      <div className="bg-blue topo flex h-full min-h-screen w-full flex-col gap-12 py-32">
        <div id="app" className="w-100">
          <div className=" w-100 zi100"></div>
          <div className="pt-30 m-auto grid w-5/6 gap-12 text-3xl">
            <h2 className="text-medium text-center text-5xl font-semibold text-white">
              Projects
            </h2>
            <div className="group grid gap-12 md:flex">
              <Image
                src={CallCenter}
                className="mx-auto h-64 w-64 rounded-md ring-4 drop-shadow-lg transition-all hover:h-[17rem] hover:w-[17rem] lg:h-[23rem] lg:w-[23rem] lg:hover:h-96 lg:hover:w-96"
                alt="transitchat"
              ></Image>
              <div className="my-auto grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-6 md:pr-6">
                <Link
                  href="https://www.transit.chat/"
                  className="text-orange-400 hover:text-orange-600"
                >
                  TransitChat
                </Link>
                <p className="text-2xl leading-normal text-gray-200">
                  TransitChat is collaboration software for public transit. With
                  TransitChat you can report, montior and schedule out public
                  transit changes without email. All while documenting issues
                  for federal review.
                </p>
              </div>
            </div>
            <div className="group grid gap-12 md:flex">
              <Image
                src={LandValueDemo}
                className="mx-auto h-64 w-64 rounded-md ring-4 drop-shadow-lg transition-all hover:h-[17rem] hover:w-[17rem] lg:h-[23rem] lg:w-[23rem] lg:hover:h-96 lg:hover:w-96"
                alt="profile photo"
              ></Image>
              <div className="my-auto grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-6 md:pr-6">
                <Link
                  href="/projects/stl-land-value"
                  className="text-orange-400 hover:text-orange-600"
                >
                  3D Land Value visualizer
                </Link>
                <p className="text-2xl leading-normal text-gray-200">
                  When it comes to determining land value we should be looking
                  at the concentration of that land value and its return. Since
                  land is finite and the cost of sprawl is high.
                </p>
              </div>
            </div>

            <div className="group grid gap-12 md:flex">
              <Image
                src={TransitIntensity}
                className="mx-auto h-64 w-64 rounded-md ring-4 drop-shadow-lg transition-all hover:h-[17rem] hover:w-[17rem] lg:h-[23rem] lg:w-[23rem] lg:hover:h-96 lg:hover:w-96"
                alt="Transit intensity map"
              ></Image>
              <div className="my-auto grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-6 md:pr-6">
                <a
                  href="https://github.com/ioTransit/transit-intensity"
                  className="text-orange-400 hover:text-orange-600"
                >
                  Transit Intensity Analysis
                </a>
                <p className="text-2xl leading-normal text-gray-200">
                  An automated analysis of gtfs to determine the intensity of
                  service for a given geographic area. This repo will analyze
                  the state of California in around 3 minutes using Golang.
                </p>
              </div>
            </div>
            <div className="group grid gap-12 md:flex">
              <Image
                src={SimpleTransitSite}
                className="mx-auto h-64 w-64 rounded-md ring-4 drop-shadow-lg transition-all hover:h-[17rem] hover:w-[17rem] lg:h-[23rem] lg:w-[23rem] lg:hover:h-96 lg:hover:w-96"
                alt="profile photo"
              ></Image>
              <div className="my-auto grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-6 md:pr-6">
                <a
                  href="https://github.com/ioTransit/simple-transit-site"
                  className="text-orange-400 hover:text-orange-600"
                >
                  Simple Transit Site
                </a>
                <p className="text-2xl leading-normal text-gray-200">
                  An application that allow transit agencies to automate the
                  generation of a website using gtfs
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
