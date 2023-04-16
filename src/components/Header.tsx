import Link from "next/link";
import { FaHamburger } from "react-icons/fa";
import { useRef, useState } from "react";
import { paths } from "../config";

export const Header = () => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div id="head" className="nav-header absolute z-10 w-full py-3">
      <nav className="ml-auto min-w-min px-4 py-2">
        <div className="header-hamburger">
          <FaHamburger
            onClick={() => setIsOpen(!isOpen)}
            size={"32px"}
          ></FaHamburger>
        </div>
        <div
          ref={popoverRef}
          className={`hamburger-content-container ${
            !isOpen ? "right" : "left"
          }`}
        >
          <div className={`popover flex flex-col`}>
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
            <Link
              className="link px-2"
              data-value="contact"
              href={paths.contact}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
