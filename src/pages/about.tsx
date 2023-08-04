import React from "react";
import { About, Header } from "../components";
import Head from "next/head";
import { Favicon } from "~/components/Favicon";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Walter Jenkins</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <div className="h-full min-h-screen">
        <Header />
        <About />
      </div>
    </>
  );
};

export default Contact;