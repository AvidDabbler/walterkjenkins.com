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
        <div>
          <h1 className=" text-center text-4xl font-bold">Walter Jenkins</h1>
          <h2 className="text-center text-2xl font-medium text-orange-500">
            Developer and Analyst helping companies tell stories with there data
          </h2>
          <div className="my-2 flex justify-center">
            <Link
              className="mx-auto rounded-full bg-green-400 px-4 py-2 text-2xl transition-all hover:bg-gray-600"
              href={paths.contact}
            >
              Contact me 📲
            </Link>
          </div>
        </div>
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
        <p className="text-3xl font-bold">Hey There! 👋</p>
        <p>
          I'm <span className="highlight">Walter Jenkins</span>, a full-stack
          developer with a passion for creating impactful digital solutions for
          the public sector. With over 13 years of experience in GIS and 5 years
          in modern web development, I specialize in delivering custom website
          and mobile applications that make a real difference in startups, urban
          planning and public transit.
        </p>
        <Image
          src={"/blog-images/3d-land-value/demo.gif"}
          alt="Land value demo"
          width={600}
          height={600}
        ></Image>
        <h2 className="text-xl font-bold">What I Offer</h2>
        <p>
          My goal is to make technology work for you, even if you're not
          tech-savvy. Whether you're looking to develop a website, a mobile app,
          or need in-depth data analysis to improve your workflows, I'm here to
          help. Here's what I can do for you:
        </p>
        <ul className="list-disc">
          <li>
            <span className="highlight">Website and Mobile Development:</span> I
            use React and Node.js to build responsive, user-friendly websites
            and mobile applications tailored to your needs.
          </li>
          <li>
            <span className="highlight">Data Analysis:</span> Leveraging web
            technologies, I can provide insightful analysis that helps
            streamline your operations, especially in areas like public transit
            and urban planning.
          </li>
          <li>
            <span className="highlight">Custom Solutions:</span> Every project
            is unique. I work closely with you to understand your goals and
            deliver solutions that are both effective and easy to use.
          </li>
        </ul>

        <h2 className="text-xl font-bold">Why Work With Me?</h2>
        <p>
          I understand the challenges faced by public sector organizations,
          especially in urban planning and public transit. My experience working
          with these sectors means I can offer practical, results-driven
          solutions. I'm not just a developer; I'm your partner in creating
          technology that empowers your organization.
        </p>

        <p>
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
