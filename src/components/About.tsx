import React from "react";
import { links, paths } from "../config";
import Link from "next/link";

export function About() {
  return (
    <div id="contact" className="my-auto h-full">
      <div className="bg-blue topo flex h-screen w-full flex-col pt-14">
        <div className="mx-auto grid w-1/2 gap-6">
          <h2 className="font-md text-4xl italic text-orange-400">About Me</h2>
          <p className="font-sans text-3xl font-medium leading-10 text-gray-200">
            What's up! I'm Walter a data analyst turned software developer who
            is passionate about telling stories with data. For 10 years I worked
            for public transit agencies in the US and I am extremely passionate
            about better government
          </p>
          <Link href={paths.home} className="text-white">
            Learn More
          </Link>
        </div>
        <div className=" w my-20 flex flex-col justify-center rounded-lg text-center">
          <h2 className="text-center text-xl text-white">My Things</h2>
          <div className="m-6 flex flex-col text-center text-white">
            <Link className="link m-6" href={paths.projects}>
              Projects
            </Link>
            <a className="link m-6" href={links.github}>
              GitHub
            </a>
            <a className="link m-6" href={links.linkedin}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
