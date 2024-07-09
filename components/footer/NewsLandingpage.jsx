import React, { useEffect, useRef, useState } from "react";
import classes from "../news/news.module.css";
import Link from "next/link";
import SingleCard from "../news/SingleCard";
import Image from "next/image";
import { useTranslation } from "react-i18next";
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const options = {
  animateOut: "slideOutDown",
  margin: 10,
  padding: 20,
  smartSpeed: 650,
  loop: true,
  center: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
      margin: 30,
      padding: 0,
    },
    600: {
      items: 2,
      margin: 50,
      padding: 10,
    },
    1000: {
      items: 3,
    },
  },
};
const NewsLandingpage = React.memo(({ news, rtl }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  useEffect(() => {
    handleLeft();
  }, [rtl]);
  const handleRight = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % news.length);
  };

  const handleLeft = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + news.length) % news.length);
  };
  //refresh the page or rerender it the component for every rtl
  const { t } = useTranslation();
  return (
    <div className={classes.newsHeader}>
      <div
        className={classes.newsTopHeading}
        style={{ direction: rtl ? "rtl" : "" }}
      >
        <h3 style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
          {t("latest")}{" "}
          <span style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
            {t("news")}
          </span>
        </h3>

        <Link
          href={"/news"}
          style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
        >
          {t("show-all-news")}
        </Link>
      </div>
      <div className={classes.newsCardMain} style={{ padding: "32px 0px" }}>
        <button className={classes.newsArrow} onClick={handleLeft}>
          <Image
            src="/assets/svg/arrowLeftGray.svg"
            width={24}
            height={24}
            alt="arrowLeft"
          />
        </button>
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OwlCarousel
            startPosition={currentSlide}
            animateIn={true}
            className="owl-carousel owl-theme"
            {...options}
            dots={false}
          >
            {news.map((newsData) => (
              <div
                key={newsData.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <SingleCard {...newsData} rtl={rtl} />
              </div>
            ))}
          </OwlCarousel>
        </div>
        <button
          className={`${classes.newsArrow} ${classes.newsArrowRigt}`}
          onClick={handleRight}
        >
          <Image
            src="/assets/svg/arrowLeftGray.svg"
            width={24}
            height={24}
            alt="arrowLeft"
            className={classes.arrowRight}
          />
        </button>
      </div>
    </div>
  );
});

export default NewsLandingpage;
