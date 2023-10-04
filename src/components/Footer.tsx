import React from "react";
import Link from "next/link";
import { paths } from "../config";

export function Footer() {
  return (
    <div className="bg-blue footer text-orange flex w-screen
     flex-row justify-around p-6 pb-10 items-center">
      <Link className="link flex" href={paths.home}>
        Home
      </Link>
      <Link className="link flex" href={paths.blog}>
        Blog
      </Link>
      <Link className="link flex" href={paths.projects}>
        Projects
      </Link>
      <a href="https://sendfox.com/walter.k.jenkins" className="bg-orange-400 hover:bg-orange-500 text-white rounded-md px-3 py-2 font-bold ">Sign-up for Updates</a>
    </div>
  );
}
