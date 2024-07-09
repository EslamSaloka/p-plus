import React from "react";
import classes from "./about.module.css";
import Image from "next/image";
import parse from "html-react-parser";
const AboutSection = ({ title, desc1, desc2 }) => {
  const lines = desc1?.split("\n");
  return (
    <div className={classes.aboutSec1}>
      <div className={classes.sec1Header}>
        <p>{title}</p>
        <div className={classes.planeImg}>
          <Image
            src="/assets/svg/linePlane.svg"
            width={70}
            height={25}
            alt="line"
          />
          <Image
            src="/assets/svg/plainy.svg"
            width={22}
            height={19}
            alt="line"
          />
        </div>
      </div>
      {lines
        ? lines.map((line, index) => <p key={index}>{parse(line)}</p>)
        : desc1}
    </div>
  );
};

export default AboutSection;
