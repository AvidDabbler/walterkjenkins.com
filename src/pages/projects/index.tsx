import Head from "next/head";
import { Header } from "~/components";
import { Favicon } from "~/components/Favicon";
import { Projects } from "~/components/Projects";
import { Footer } from "~/components/Footer";

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects - Walter Jenkins </title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <Header />
      <Projects></Projects>
      <Footer />
    </>
  );
};
export default ProjectsPage;
