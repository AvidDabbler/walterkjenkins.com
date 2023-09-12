import React from "react";
import Image from "next/image";
import Profile from "../assets/profile.png";
import BRLogo from "../assets/br-logo.png";
import MekongLoog from '../assets/mekong-logo.png'
import MITLogo from '../assets/mitlogo.png'
import CLTLogo from '../assets/clt-logo.jpg'
import DuoLogo from '../assets/duo-logo.jpg'
import ReactLogo from '../assets/react-logo.png'
import NextJsLogo from '../assets/nextjs-logo.png'
import D3Logo from '../assets/d3-logo.png'
import DrizzleLogo from '../assets/drizzle-logo.png'
import EsriLogo from '../assets/esri-logo.jpg'
import MapboxLogo from '../assets/mapbox-logo.png'
import PostGISLogo from '../assets/postgis-logo.png'
import ReactTableLogo from '../assets/react-table-logo.jpg'
import RemixLogo from '../assets/remix-logo.jpg'
import TailwindLogo from '../assets/tailwind-logo.png'
import PrismaLogo from '../assets/prisma-logo.png'
export function About() {
  return (
    <>
      <div className="bg-blue topo flex h-full min-h-screen w-full flex-col gap-12 py-32">
        <div className="grid gap-28">
          <div className="mx-16 flex justify-between gap-3">
            <div className="grid gap-12 md:flex">
              <Image
                src={Profile}
                className="mx-auto h-64 w-64 rounded-full ring-4 drop-shadow-lg lg:h-96 lg:w-96"
                alt="profile photo"
              ></Image>
              <div className="grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-12 md:pr-6">
                <h2 className=" font-md text-3xl leading-10 text-orange-400 md:text-5xl">
                  About Me
                </h2>
                <div className="grid gap-6 md:gap-6">
                  <p className=" text-2xl leading-normal text-gray-200">
                    I'm Walter, a data analyst turned software developer who is
                    passionate about telling stories with data.
                  </p>
                  <p className="text-2xl leading-normal text-gray-200 lg:mx-auto">
                    I like to build tools that turn complex work into simple tools
                    and data visualizations that make sense to non-techies.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-12">
            <h2 className="text-center text-3xl text-white">People I've worked with</h2>
            <div className="mx-auto px-20 flex flex-wrap gap-10 justify-around">
              <div className="flex items-center">
                <Image alt='BlueRaster Logo' src={BRLogo} width={150} height={150}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='Mekong Logo' src={MekongLoog} width={150} height={150}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='MIT Logo' src={MITLogo} width={190} height={150}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='City of Charlote Logo' src={CLTLogo} width={150} height={150}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='Duo Studio Logo' src={DuoLogo} width={150} height={150}></Image>
              </div>
            </div>
          </div>
          <div className="grid gap-12">
            <h2 className="text-center text-3xl text-white">Frameworks</h2>
            <div className="mx-auto px-20 flex flex-wrap gap-10 justify-around">
              <div className="flex items-center">
                <Image alt='Remix Logo' src={RemixLogo} width={240} height={150}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='React Logo' src={ReactLogo} width={150} height={150}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='Nextjs Logo' src={NextJsLogo} width={220} height={150}></Image>
              </div>
            </div>
          </div>
          <div className="grid gap-12">
            <h2 className="text-center text-3xl text-white">Libraries and API's</h2>
            <div className="mx-auto px-20 flex flex-wrap gap-10 justify-around">
              <div className="flex items-center">
                <Image alt='Mapbox Logo' src={MapboxLogo} width={230} height={70}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='D3 Logo' src={D3Logo} width={150} height={100}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='Tailwind Logo' src={TailwindLogo} width={230} height={75}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='React Table Logo' src={ReactTableLogo} width={230} height={100}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='Esri Logo' src={EsriLogo} width={150} height={100}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='Drizzle Logo' src={DrizzleLogo} width={150} height={100}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='PostGIS Logo' src={PostGISLogo} width={150} height={100}></Image>
              </div>
              <div className="flex items-center">
                <Image alt='Prisma Logo' src={PrismaLogo} width={150} height={100}></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
