import React from "react";
import { links, paths } from "../config";
import Link from "next/link";
import Image from "next/image";
import Profile from "../assets/profile.png";

export function About() {
  return (
    <div id="contact" className="my-auto h-full">
      <div className="flex w-full flex-col">
        <div className="bg-blue topo grid w-full gap-8 py-32">
          <div className=" mx-16 flex  justify-between gap-3">
            <div className="grid">
              <h2 className=" font-md text-5xl leading-10 text-orange-400">
                About Me
              </h2>
              <div className="grid gap-12">
                <p className=" text-4xl leading-normal text-gray-200">
                  I'm Walter, a data analyst turned software developer who is
                  passionate about telling stories with data.
                </p>
              </div>
            </div>

            <Image
              src={Profile}
              className="rounded-full ring-4 drop-shadow-lg"
              alt="profile photo"
              width={"300"}
            ></Image>
          </div>

          <p className="mx-16 text-4xl leading-normal text-gray-200 lg:mx-auto lg:w-2/3">
            I like to build tools that turn complex work into simple tools and
            data visualizations that make sense to non-techies.
          </p>
        </div>
        <div className="bg-blue-500/30 bg-opacity-95 w py-20 flex flex-col justify-center rounded-lg text-center">
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
