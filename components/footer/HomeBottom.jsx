import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Footer from "./footer";
import Slider from "react-infinite-logo-slider";
import NewsLandingpage from "./NewsLandingpage";
import Image from "next/image";
import Subscribe from "../ui/Subscribe";
import StakeholderModal from "./StakeholderModal";

const HomeBottom = ({ imgs, conVersion, desc, news, rtl }) => {
    const [sliderWidth, setSliderWidth] = useState("180px");
    const [leftRight, setLeftRight] = useState(false);
    const [selectedStakholder, setSelectedStakholder] = useState(null);
    //setting up for the feedback modal

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (stakholder) => {
        setSelectedStakholder(stakholder); // Set the selected stakholder
        setOpen(true); // Open the modal
    };

    const likeAndOpenLink = (link) => {
        // Perform the action to simulate a "like" (replace with your actual like functionality)

        // Open a new tab or window with the specified URL
        window.open(link, "_blank");
    };

    useEffect(() => {
        const handleResize = () => {
            // Adjust the width based on the screen size
            setSliderWidth(window.innerWidth <= 600 ? "110px" : "180px");
        };

        // Set the initial width and add event listener for window resize
        handleResize();
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={classes.homeBottomSection}>
            <NewsLandingpage news={news} rtl={rtl} />
            <div className={classes.homeBottomMain} style={{ direction: rtl ? "rtl" : "ltr" }}>
                <div className={classes.bottomLogo} style={{ left: rtl ? "-6%" : "10%" }}>
                    <h2 style={{ direction: rtl ? "rtl" : "", fontFamily: rtl ? "DINNext-Arabic-medium" : "" }}>
                        <span style={{ fontFamily: rtl ? "DINNext-Arabic-medium" : "" }}>
                            {rtl ? "أصحاب" : "Our"}
                        </span>{" "}
                        {rtl ? "المصلحة" : "Stackholders"}
                    </h2>
                </div>
                <div className={classes.stakholderArrows} style={{ direction: "ltr", right: rtl ? "80%" : "10%" }}>
                    <Image
                        src="assets/svg/stackholderArrow.svg"
                        width={25}
                        height={25}
                        alt="ArrowLeft"
                        onClick={() => setLeftRight(false)}
                        className={classes.stakholderNewsArrow}
                    />
                    <Image
                        src="assets/svg/stackholderArrow.svg"
                        width={25}
                        height={25}
                        alt="ArrowLeft"
                        onClick={() => setLeftRight(true)}
                        className={classes.stakholderNewsArrow}
                    />
                </div>
                <div className={classes.partners}>
                    <Slider
                        width={sliderWidth}
                        duration={15}
                        pauseOnHover={true}
                        blurBorders={true}
                        toRight={leftRight}
                    >
                        {imgs.map((stakholder, index) => (
                            <Slider.Slide
                                key={`${index}${stakholder.name}`}
                                onClick={() => handleOpen(stakholder)} // Pass stakholder object directly
                            >
                                <div className={classes.partnerItem}>
                                    {stakholder.avatar ? (
                                        <Image
                                            src={stakholder.avatar}
                                            width={140}
                                            height={140}
                                            alt={stakholder.title}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                background: "yellow",
                                                width: 140,
                                                height: 140,
                                                borderRadius: "80px",
                                            }}
                                        ></div>
                                    )}
                                </div>
                            </Slider.Slide>
                        ))}
                    </Slider>
                </div>
                {selectedStakholder && (
                    <StakeholderModal
                        open={open}
                        handleClose={handleClose}
                        openLink={likeAndOpenLink}
                        link={selectedStakholder.url}
                        data={selectedStakholder}
                        rtl={rtl}
                    />
                )}
            </div>
            <Subscribe rtl={rtl} />
            <Footer conVersion={conVersion} desc={desc} rtl={rtl} />
        </div>
    );
};

export default HomeBottom;
