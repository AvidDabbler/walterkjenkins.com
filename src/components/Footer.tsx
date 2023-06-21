import React from "react";
import Link from "next/link";
import { paths } from "../config";

export function Footer() {
  return (
    <div className="bg-blue footer text-orange flex h-10 w-full flex-row justify-around p-6 pb-10">
      <Link className="link flex" href={paths.home}>
        Home
      </Link>
      {/* <Link className="link flex" href={paths?.blog}>
        Blog
      </Link> */}
      <Link className="link flex" href={paths.contact}>
        Contact
      </Link>
    </div>
  );
}
