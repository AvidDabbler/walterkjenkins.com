import Head from "next/head";
import Link from "next/link";
import { Header } from "~/components";
import { Favicon } from "~/components/Favicon";
import Image from "next/image";
import MapDesigner from "../../assets/map-designer.png";

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects - Walter Jenkins </title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <main className="bg-blue topo">
        <div id="app" className="w-100 h-screen">
          <div className=" w-100 zi100">
            <Header />
          </div>
          <div className="m-auto grid w-5/6 gap-12 pt-40 text-3xl">
            <h2 className="text-3xl text-white text-center">Projects</h2>
            <div className="group grid gap-12 md:flex">
              <Image
                src={MapDesigner}
                className="lg:96 mx-auto h-64 w-64 rounded-md ring-4 drop-shadow-lg transition-all hover:h-[17rem] hover:w-[17rem] lg:w-96"
                alt="profile photo"
              ></Image>
              <div className="my-auto grid w-full gap-3 md:flex md:w-2/3 md:flex-col md:gap-6 md:pr-6">
                <Link
                  href="projects/designer"
                  className="text-orange-400 hover:text-orange-600"
                >
                  Map Designer
                </Link>
                <p className="text-2xl leading-normal text-gray-200">
                  A work in progress to upload and display geojson data in the
                  browser
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Projects;
