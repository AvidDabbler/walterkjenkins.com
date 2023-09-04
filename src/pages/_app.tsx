import { type AppType } from "next/dist/shared/lib/utils";
import "mapbox-gl/dist/mapbox-gl.css";
import "~/styles/globals.css";
import "~/styles/index.scss"
import "~/styles/App.scss";
import "~/styles/notion.css";
import Script from "next/script";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-BYKHKRLV0K"></Script>
    <Script id='gtag'>{`          
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-BYKHKRLV0K');
        `}</Script>
    <Component {...pageProps} />
  </>
};

export default MyApp;
