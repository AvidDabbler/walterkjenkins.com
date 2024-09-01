import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Header } from "../components";
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
        <div>
          <div className=" w-100 ">
            <Header />
            <div className=" bg-blue topo py-32">
              <AboutWalter />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
