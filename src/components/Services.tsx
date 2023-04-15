import { Fragment } from "react";
import Image from "next/image";

// ! CONVERT TO CLASS
export const Services = () => {
  const ser = [
    {
      name: "Maps",
      icon: "../assets/map.svg",
      desc: "Designing stunning mapping applications and visualizations.",
      credit: "GPS by Turkkub from the Noun Project",
      projectList: [],
    },
    {
      name: "Data",
      icon: "../../assets/data.svg",
      desc: "Architecting sustainable logical data structures for sensible applications.",
      credit: "Data by OliM from the Noun Project",
      projectList: [],
    },
    {
      name: "Processing",
      icon: "../../assets/tools.svg",
      desc: "A track record of turning chaos into calm by standardizing workflows and processes.",
      credit: "tools by Luboš Volkov from the Noun Project",
      projectList: [],
    },
  ];

  // if page width is > 1000?
  return (
    <Fragment>
      {ser.map((a, k) => {
        // issue with icon div height and width
        return (
          <div
            key={k}
            className="white blue-div br3 file: pa2 mv3 flex w-1/4 flex-col"
          >
            <Image
              src={a.icon}
              alt={a.name}
              data-credit={a.credit}
              className="center section-title icon pa3 center v-mid flex w-40"
            ></Image>
            <h2 className="pa0 ma0 section-title white">{a.name}</h2>
            <p className="mv3 helvetica white">{a.desc}</p>
          </div>
        );
      })}
    </Fragment>
  );
};
