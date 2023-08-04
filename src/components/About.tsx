import React from "react";
import { paths } from "../config";
import Link from "next/link";
import Image from "next/image";
import Profile from "../assets/profile.png";

export function About() {
  return (
    <>
      <div className="bg-blue topo flex h-full min-h-screen w-full flex-col gap-12 py-32">
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
        <div className="grid gap-6">
          <h2 className="text-center text-3xl text-white">Links</h2>
          <div className="mx-auto grid gap-12 md:flex">
            <Link href={paths.projects}>
              <h2 className="text-center text-2xl text-orange-500 hover:text-orange-600">
                Projects
              </h2>
            </Link>
            <Link href={paths.blog}>
              <h2 className="text-center text-2xl text-orange-500 hover:text-orange-600">
                Blog
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
