import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import Link from "next/link";
import { paths } from "~/config";

export const AboutWalter = () => {
  return (
    <div className="bg-blue topo flex h-full min-h-screen w-full flex-col gap-12 ">
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-6 px-6  text-white md:w-1/2">
        <Image
          src={"/images/headshot.jpg"}
          alt="headshot of walter"
          className="mx-auto rounded-full"
          width={200}
          height={200}
        ></Image>
        <div className="flex flex-col gap-6 pb-8">
          <h1 className="pacifico text-center text-6xl">Walter Jenkins</h1>
          <h2 className="text-center text-3xl font-medium text-orange-500">
            Developer and Analyst helping companies tell stories with there data
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <p className="mx-1 flex flex-wrap justify-center rounded-2xl bg-orange-400 px-2 text-xl font-medium capitalize text-white">
              Startups
            </p>
            <p className="mx-1 flex flex-wrap justify-center rounded-2xl bg-orange-400 px-2 text-xl font-medium capitalize text-white">
              Data Analysis
            </p>
            <p className="mx-1 flex flex-wrap justify-center rounded-2xl bg-orange-400 px-2 text-xl font-medium capitalize text-white">
              Mobile app development
            </p>
            <p className="mx-1 flex flex-wrap justify-center rounded-2xl bg-orange-400 px-2 text-xl font-medium capitalize text-white">
              Web Mapping
            </p>
            <p className="mx-1 flex flex-wrap justify-center rounded-2xl bg-orange-400 px-2 text-xl font-medium capitalize text-white">
              Technical Project Management
            </p>
            <p className="mx-1 flex flex-wrap justify-center rounded-2xl bg-orange-400 px-2 text-xl font-medium capitalize text-white">
              Product Design
            </p>
            <p className="mx-1 flex flex-wrap justify-center rounded-2xl bg-orange-400 px-2 text-xl font-medium capitalize text-white">
              Web Development
            </p>
          </div>
          <div className="my-2 flex justify-center">
            <Link
              className="mx-auto rounded-full bg-green-400 px-4 py-2 text-2xl transition-all hover:bg-gray-600"
              href={paths.contact}
            >
              Contact me 📲
            </Link>
          </div>
        </div>
        <p className="text-center text-4xl font-bold">Hey There! 👋</p>
        <p className="text-2xl">
          I'm <span className="highlight font-medium">Walter Jenkins</span>, a
          full-stack developer with focused on telling stories with data and
          solutions for the public sector. My clients often have a story they
          want to tell and I help them write it. Whether it is using maps of
          communities or stories told with charts and tables, I focus on making
          sure that the reader walks away smarter by using as few words as
          possible.
        </p>
      </div>
      <h2 className="mx-auto text-4xl font-bold text-white">Trusted By</h2>
      <div className="mx-auto flex flex-wrap justify-center gap-6">
        <div className=" flex h-[250px] w-[250px] items-center rounded-full bg-white p-6">
          <Image
            src={"/images/clt1.jpg"}
            alt="headshot of walter"
            className="rounded-full bg-white"
            width={250}
            height={250}
          ></Image>
        </div>
        <div className="flex h-[250px] w-[250px] items-center rounded-full bg-white p-6">
          <Image
            src={"/images/metrostl.png"}
            alt="headshot of walter"
            className="mx-auto bg-white"
            width={200}
            height={200}
          ></Image>
        </div>
        <div className="flex h-[250px] w-[250px] items-center rounded-full bg-white p-6">
          <Image
            src={"/images/un.png"}
            alt="headshot of walter"
            className="mx-auto bg-white"
            width={200}
            height={100}
          ></Image>
        </div>
        <div className="flex h-[250px] w-[250px] items-center rounded-full bg-white p-6">
          <Image
            src={"/images/world-central-kitchen.png"}
            alt="headshot of walter"
            className="mx-auto bg-white"
            width={200}
            height={100}
          ></Image>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-6 px-6  text-white md:w-1/2">
        <Image
          src={"/blog-images/3d-land-value/demo.gif"}
          alt="Land value demo"
          width={600}
          height={600}
        ></Image>
        <h3 className="text-center text-3xl font-bold">What I Offer</h3>
        <p className="text-2xl">
          While I can bring your story to life with data, I am especially fond
          of working on websites that help the public sector make an impact. As
          a former public servant I know how hard it is to get things done and I
          help cut through and do things that the public sector might take a
          long time to.
        </p>
        <p className="text-2xl">
          In the past I have developed websites for causes, organizations and
          buisinesses, developed apps for organizations like the World Central
          Kitchen and built analysis workflows for the United Nations.
        </p>
        <ul className="grid list-disc gap-6 px-12 text-2xl">
          <li>
            <span className="highlight font-medium">
              Website and Mobile Development:
            </span>{" "}
            I use React and Node.js to build responsive, user-friendly websites
            and mobile applications tailored to your needs.
          </li>
          <li>
            <span className="highlight font-medium">Data Analysis:</span>{" "}
            Leveraging web technologies, I can provide insightful analysis that
            helps streamline your operations, especially in areas like public
            transit and urban planning.
          </li>
          <li>
            <span className="highlight font-medium">Custom Solutions:</span>{" "}
            Every project is unique. I work closely with you to understand your
            goals and deliver solutions that are both effective and easy to use.
          </li>
        </ul>

        <h2 className="text-center text-3xl font-bold">Why Work With Me?</h2>
        <p className="text-2xl">
          I understand the challenges faced by public sector organizations,
          especially in urban planning and public transit. My experience working
          with these sectors means I can offer practical, results-driven
          solutions. I'm not just a developer; I'm your partner in creating
          technology that empowers your organization.
        </p>

        <p className="text-2xl">
          Let's work together to make your vision a reality. Whether it's a new
          website, a mobile app, or a data-driven analysis, I'm here to help you
          navigate the complexities of the digital world.
        </p>
        <div className="my-2 flex justify-center">
          <Link
            className="mx-auto rounded-full bg-green-400 px-4 py-2 text-2xl transition-all hover:bg-gray-600"
            href={"https://www.linkedin.com/in/walter-k-jenkins/"}
          >
            Contact me 📲
          </Link>
        </div>
      </div>
    </div>
  );
};
