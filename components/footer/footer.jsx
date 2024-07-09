import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import DialogModal from "../ui/DialogModal";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
const Footer = ({ conVersion, rtl }) => {
  const { t } = useTranslation();
  const { fontSizeGeneral } = useFontSize();
  const [links, setLinks] = useState([]);
  const [linkProvide, setLinkProvide] = useState("");
  //setting up for the dialog modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const likeAndOpenLink = (link) => {
    // Perform the action to simulate a "like" (replace with your actual like functionality)

    // Open a new tab or window with the specified URL
    window.open(link, "_blank");
  };
  //Getting current year
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  useEffect(() => {
    setLinks(conVersion.shortLinks);
  }, [conVersion]);
  const router = useRouter();
  return (
    <div className={classes.footerMain} style={{ direction: rtl ? "rtl" : "" }}>
      <div className={classes.footerContentMain}>
        <div className={classes.logoSec}>
          <Image
            src="/assets/svg/GacaFooter.svg"
            width={135}
            height={50}
            alt="Gaca"
          />
          <p
            style={{
              fontSize: `${16 + fontSizeGeneral}px`,
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
            }}
          >
            {rtl
              ? conVersion.globalSettings.footerDescription
              : conVersion?.globalSettings?.footerDescriptionEN}
          </p>
          <div className={classes.footerCopyRight}>
            <p
              style={{
                fontSize: `${16 + fontSizeGeneral}px`,
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              }}
            >
              © {currentYear} {t("copy-right")}
            </p>
          </div>
        </div>

        <div className={classes.visionFooter}>
          <div className={classes.linksSlogans}>
            {links?.map((link, index) => {
              return (
                <div
                  style={{ cursor: "pointer", fontSize: "12px" }}
                  onClick={() => {
                    handleOpen();
                    setLinkProvide(link.linkAddress);
                  }}
                  key={index}
                >
                  <p
                    style={{
                      fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                      width: "100%",
                      margin: 0,
                      fontSize: `${12 + fontSizeGeneral}px`,
                    }}
                  >
                    {link.title}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginLeft: "-20px",
            }}
          >
            <Image
              src="/assets/svg/digitalGov.svg"
              width={200}
              height={80}
              alt="vision"
              className={classes.visionImg}
            />
          </div>
          <div className={classes.footerVisions}>
            <Image
              src="/assets/svg/vision-2030.svg"
              width={90}
              height={50}
              alt="vision-2030"
              className={classes.visionImg}
            />
            <Image
              src="/assets/svg/GacaFooter.svg"
              width={110}
              height={50}
              alt="vision"
              className={classes.visionImg}
            />

            <Image
              src="/assets/svg/govSa.svg"
              width={130}
              height={45}
              alt="Saudi"
              className={classes.visionImg}
            />
          </div>
        </div>

        <div className={classes.contact}>
          <h1 style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
            {t("connect-us")}
          </h1>
          <div className={classes.socialIcons}>
            <div
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.socialMedia?.faceBook);
              }}
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-facebook.svg"
                alt="facebook"
                width={24}
                height={24}
              />
            </div>
            <div
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.socialMedia?.instgram);
              }}
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-instgram.svg"
                alt="instgram"
                width={24}
                height={24}
              />
            </div>
            <div
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.socialMedia?.twitter);
              }}
              className={classes.icon}
            >
              <Image
                src="/assets/svg/xIcon.svg"
                alt="X"
                width={24}
                height={24}
              />
            </div>
            <div
              onClick={() => {
                handleOpen();
                setLinkProvide(conVersion?.socialMedia?.youTube);
              }}
              className={classes.icon}
            >
              <Image
                src="/assets/svg/ico-youtube.svg"
                alt="youtube"
                width={24}
                height={24}
              />
            </div>
          </div>
          <ul className={classes.footerContent}>
            <li
              onClick={() => {
                router.push("/");
              }}
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("home-route")}
            </li>
            <li
              onClick={() => {
                router.push("/about");
              }}
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("about")}
            </li>
            <li
              onClick={() => {
                router.push("/documents");
              }}
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("download")}
            </li>
            <li
              onClick={() => {
                router.push("/news");
              }}
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("news")}
            </li>
            <li
              onClick={() => {
                router.push("/faq");
              }}
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("faq")}
            </li>
          </ul>
        </div>
        <DialogModal
          open={open}
          handleClose={handleClose}
          openLink={likeAndOpenLink}
          link={linkProvide}
        />
      </div>
    </div>
  );
};

export default Footer;
