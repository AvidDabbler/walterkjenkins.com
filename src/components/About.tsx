import React from "react";
import { links, paths } from "../config";
import Link from "next/link";

export function About() {
  return (
    <div id="contact" className="my-auto h-full">
      <div className="bg-orange h-px"></div>
      <div className="bg-blue topo flex h-screen w-full flex-col items-center pt-14 text-center">
        <div className=" w my-20 flex flex-col justify-center rounded-lg text-center">
          <h2 className="text-center text-xl text-white">My Things</h2>
          <div className="m-6 flex flex-col text-center text-white">
            <Link className="link m-6" href={paths.blog}>
              Blog
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
