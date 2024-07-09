import React, { useEffect, useState } from "react";
import classes from "./about.module.css";
import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import Subscribe from "../ui/Subscribe";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
import classestwo from "../home/Home-main/home-one.module.css";
const AboutPage = ({ data, rtl }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { fontSizeGeneral } = useFontSize();
  const [showBtn, setShowBtn] = useState(false);

  //side effect for showing arrow up Bottom when the window be in the second section or down
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 300; // Adjust this value based on when you want the button to appear
      setShowBtn(scrollTop > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //Handling clicking button up to the top of the page
  const handleClick = () => {
    const targetElement = document.getElementById("home");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className={classes.aboutPageMain}
      style={{ direction: rtl ? "rtl" : "" }}
    >
      <div className={classes.choosen}>
        <p style={{ fontSize: `${14 + fontSizeGeneral}px` }}>
          <span
            onClick={() => {
              router.push("/");
            }}
            style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
          >
            {t("home-route")}
          </span>
          <Image
            src="/assets/svg/Chevron.svg"
            width={16}
            height={16}
            alt="chev"
            style={{ transform: rtl ? "rotate(180deg)" : "" }}
          />
        </p>
        <h1
          style={{
            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            fontSize: `${48 + fontSizeGeneral}px`,
          }}
        >
          {t("about")}
        </h1>
      </div>
      <div className={classes.aboutSection}>
        <Image
          src="/assets/imges/snap-img.png"
          width={630}
          height={450}
          alt="snap-imges"
          data-aos="fade-left"
        />
        <div className={classes.content} data-aos="fade-right">
          <h1
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${28 + fontSizeGeneral}px`,
            }}
          >
            {t("snap")}
          </h1>
          <p
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${15 + fontSizeGeneral}px`,
            }}
          >
            {parse(rtl ? data.information.content : data.information.contentEN)}
          </p>
        </div>
      </div>
      <div className={classes.visionMission}>
        <div className={classes.vision} data-aos="fade-up">
          <Image
            src={"/assets/svg/about-vision.svg"}
            width={64}
            height={64}
            alt="vision"
          />
          <h1
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${24 + fontSizeGeneral}px`,
            }}
          >
            {t("vision")}
          </h1>
          <p
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${14 + fontSizeGeneral}px`,
            }}
          >
            {" "}
            {parse(rtl ? data.information.vision : data.information.visionEN)}
          </p>
        </div>
        <div className={classes.vision} data-aos="fade-down">
          <Image
            src={"/assets/svg/about-mission.svg"}
            width={64}
            height={64}
            alt="mission"
          />
          <h1
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${24 + fontSizeGeneral}px`,
            }}
          >
            {t("mission")}
          </h1>
          <p
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${14 + fontSizeGeneral}px`,
            }}
          >
            {parse(rtl ? data.information.mission : data.information.missionEN)}
          </p>
        </div>
      </div>
      <div className={classes.strategic}>
        <div className={classes.strategiContent}>
          <h1
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              fontSize: `${26 + fontSizeGeneral}px`,
            }}
          >
            {t("strategic")}
          </h1>
          {data.objectives.map((content, index) => {
            return (
              <div
                key={index}
                className={classes.singleStrategic}
                data-aos="fade-right"
              >
                <Image
                  src="/assets/svg/leftIconStrategic.svg"
                  width={20}
                  height={20}
                  alt="left-icon"
                  style={{ transform: rtl ? "rotate(180deg)" : "" }}
                />
                <p
                  style={{
                    fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                    fontSize: `${14 + fontSizeGeneral}px`,
                  }}
                >
                  {rtl ? content.title : content.titleEN}
                </p>
              </div>
            );
          })}
        </div>
        <Image
          src="/assets/imges/stratigec-img.png"
          width={600}
          height={400}
          alt="strategic"
          layout="responsive"
          className={classes.strategicImg}
          data-aos="fade-left"
        />
      </div>
      <Subscribe rtl={rtl} />
      {showBtn && (
        <div className={classestwo.btnUp} onClick={handleClick}>
          <Image
            src="/assets/svg/arrow-up.svg"
            width={15}
            height={15}
            alt="arrow-down"
            className={classestwo.arrowDown}
          />
        </div>
      )}
    </div>
  );
};

export default AboutPage;
