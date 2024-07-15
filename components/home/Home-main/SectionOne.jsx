import React from "react";
import classes from "./home-one.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";

const SectionOne = ({ title, desc, rtl }) => {
    const { t } = useTranslation();
    const { fontSizeGeneral } = useFontSize();
    const router = useRouter();
    const handleClick = () => {
        const targetElement = document.getElementById("masterplan");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    const fontFamily = rtl ? "DINNext-Arabic-meduim" : "";
    const direction = rtl ? "rtl" : "ltr";
    const marginRight = rtl ? "0px" : "auto";

    return (
        <div className={'welcome-section ' + classes.sectionOne} style={{ direction }}>
            {/* Video background */}
            <div className={classes.videoContainer}>
                <video autoPlay muted loop className={classes.video}>
                    <source src="/assets/video/vid-background.mp4" type="video/mp4" />
                    {/* Add additional source elements for different video formats if needed */}
                    Your browser does not support the video tag.
                </video>
                <div className={classes.overlay}></div>
            </div>

            {/* Content section in the home page section */}
            <div className={classes.secOneContect} data-aos="fade-right">
                <h1
                    style={{
                        fontFamily,
                        fontSize: `${55 + fontSizeGeneral}px`,
                    }}
                >
                    {title}
                </h1>
                <div
                    style={{
                        fontFamily,
                        fontSize: `${16 + fontSizeGeneral}px`,
                    }}
                >
                    {parse(desc)}
                </div>
                <div
                    className={classes.secOneButton}
                    onClick={() => {
                        router.push("/download");
                    }}
                >
                    <p
                        style={{
                            fontFamily,
                            fontSize: `${20 + fontSizeGeneral}px`,
                        }}
                    >
                        {t("downloadDoc")}
                    </p>
                </div>
            </div>
            <div
                className={classes.sectionTwo}
                style={{ marginRight }}
            >
                <Image
                    src="/assets/imges/Brochure-landingpage.webp"
                    width={700}
                    height={520}
                    className={'img-fluid ' + classes.streetPlane}
                    alt="Banner"
                    data-aos="fade-left"
                />
            </div>
            <div className={classes.btnDown} onClick={handleClick}>
                <Image
                    src="/assets/svg/arrow-down.svg"
                    width={24}
                    height={24}
                    alt="arrow-down"
                    className={classes.arrowDown}
                />
            </div>
        </div>
    );
};

export default SectionOne;