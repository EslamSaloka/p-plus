import React, { useEffect, useState } from "react";
import SectionOne from "./Home-main/SectionOne";
import MasterPlan from "./master-plan/MasterPlan";
import HomeBottom from "../footer/HomeBottom";
import classes from "./Home-main/home-one.module.css";
import Image from "next/image";

const HomePage = ({
  dataHome,
  isFeedbackVisible,
  handleToggleFeedback,
  conVersion,
  lang,
  rtl,
}) => {
  const [showBtn, setShowBtn] = useState(false);

  // Side effect for showing arrow up button when the window scrolls
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

  // Handling clicking button to scroll up to the top of the page
  const handleClick = () => {
    const targetElement = document.getElementById("home");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Construct the title and description from data API hero section
  const title = !rtl ? dataHome.hero.titleEN : dataHome.hero.title;
  const desc = !rtl ? dataHome.hero.descriptionEN : dataHome.hero.description;

  return (
    <div
      onClick={() => {
        isFeedbackVisible ? handleToggleFeedback() : null;
      }}
      style={{
        filter: isFeedbackVisible ? "brightness(0.5)" : "none", // Corrected to reset filter to normal state when not visible
        transition: "all 0.6s ease-in-out",
        height: isFeedbackVisible ? "calc(100vh - 111px)" : "auto", // Corrected to ensure height and overflow are properly reset
        overflow: isFeedbackVisible ? "hidden" : "visible", // Corrected to ensure overflow is properly reset
      }}
    >
      <SectionOne
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        title={title}
        desc={desc}
        rtl={rtl}
      />
      <MasterPlan layers={dataHome?.masterPlanLayers?.returnData} rtl={rtl} />
      <HomeBottom
        news={dataHome?.lastNews}
        imgs={dataHome?.stakeHolders}
        conVersion={conVersion}
        desc={desc}
        rtl={rtl}
      />
      {showBtn && (
        <div className={classes.btnUp} onClick={handleClick}>
          <Image
            src="/assets/svg/arrow-up.svg"
            width={15}
            height={15}
            alt="arrow-up"
            className={classes.arrowUp}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;