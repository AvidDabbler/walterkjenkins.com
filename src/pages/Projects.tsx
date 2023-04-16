import Head from "next/head";
import Link from "next/link";
import { Header } from "~/components";
import { Favicon } from "~/components/Favicon";

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
          <div className="m-auto grid w-1/2 pt-40">

            <Link href="projects/designer">
              <span className="text-white">Designer</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
export default Projects;
