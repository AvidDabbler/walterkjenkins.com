"use client";
import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Header, About, Signature } from "../components";
import { BackgroundMap } from "~/components/BackgroundMap";
import { Favicon } from "~/components/Favicon";
import "mapbox-gl/dist/mapbox-gl.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Walter Jenkins</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <main>
        <div>
          <div id="app" className="w-100 h-screen">
            <div className=" w-100 ">
              <Header />
            </div>
            <div id="map" className="mapContainer w-100 fixed">
              <BackgroundMap />
            </div>
            <Signature />
          </div>
          <About />
        </div>
      </main>
    </>
  );
};

export default Home;
