import React from "react";
import { About, Header } from "../components";
import Head from "next/head";
import { Favicon } from "~/components/Favicon";

export const Contact = () => {
  return (
    <>
      <Head>
        <title>Walter Jenkins</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <div>
        <Header />
        <About />
      </div>
    </>
  );
};
