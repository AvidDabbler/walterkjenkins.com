"use client";
import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Header, Projects, Signature } from "../components";
import { BackgroundMap } from "~/components/BackgroundMap";
import { Favicon } from "~/components/Favicon";
import "mapbox-gl/dist/mapbox-gl.css";
import { Footer } from "~/components/Footer";
import { AboutWalter } from "~/components/about";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Walter Jenkins</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="w-screen">
        <div id="app" className="h-screen w-screen">
          <div className=" w-100 ">
            <Header />
          </div>
          <div id="map" className="mapContainer w-100 fixed">
            <BackgroundMap />
          </div>
          <Signature />
        </div>
        <div className="bg-blue topo z-50 pt-20">
          <AboutWalter />
        </div>
        <Projects />
      </main>
      <Footer />
    </>
  );
};

export default Home;
