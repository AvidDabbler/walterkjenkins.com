import Link from "next/link";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";
import { paths } from "../config";
import clsx from "clsx";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      id="head"
      className="nav-header fixed z-10 w-screen overflow-x-hidden py-3"
    >
      <nav className="ml-auto min-w-min px-4 py-2">
        <div className="header-hamburger">
          <button onClick={() => setIsOpen(!isOpen)}>
            <FaHamburger size={"32px"}></FaHamburger>
          </button>
        </div>
        <div
          className={clsx(
            "fixed top-20  rounded bg-white shadow-lg transition-all duration-150 ",
            isOpen ? "right-5" : "-right-96"
          )}
        >
          <div className="grid gap-5 p-5">
            <Link className="link px-2" data-value="home" href={paths.home}>
              Home
            </Link>
            <Link
              className="link px-2"
              data-value="projects"
              href={paths.projects}
            >
              Projects
            </Link>
            <Link className="link px-2" data-value="about" href={paths.about}>
              About
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
