import { type AppType } from "next/dist/shared/lib/utils";
import "mapbox-gl/dist/mapbox-gl.css";
import "~/styles/globals.css";
import "~/styles/App.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
