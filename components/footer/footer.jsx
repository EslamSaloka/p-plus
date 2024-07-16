import React, { useEffect, useState } from "react";
import classes from "./home-bottom.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import DialogModal from "../ui/DialogModal";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
import ExternalLinkModal from "./modals/ExternalLinkModal";

const Footer = ({ conVersion, rtl }) => {
    const { t } = useTranslation();
    const { fontSizeGeneral } = useFontSize();
    const [links, setLinks] = useState([]);
    const [socialLinks, setSocialLinks] = useState({});

    const [linkProvide, setLinkProvide] = useState("");
    //setting up for the dialog modal
    const [open, setOpen] = useState(false);
    const [selectedShortLink, setSelectedShortLink] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (shortLink) => {
        setSelectedShortLink(shortLink); // Set the selected shortLink
        setOpen(true); // Open the modal
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
        if (conVersion && conVersion.shortLinks) {
            setLinks(conVersion.shortLinks);
        }
        if (conVersion && conVersion.socialMedia) {
            setSocialLinks(conVersion.socialMedia);
        }
    }, [conVersion]);

    const router = useRouter();

    const fontFamily = rtl ? "DINNext-Arabic-meduim" : "";
    const directionValue = rtl ? "rtl" : "ltr";

    return (
        <div className={'main-footer ' + classes.footerMain} style={{ direction: directionValue }}>
            <div className={'footer-body ' + classes.footerContentMain}>
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
                            fontFamily,
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
                                fontFamily,
                            }}
                        >
                            © {currentYear} {t("copy-right")}
                        </p>
                    </div>
                </div>

                <div className={classes.visionFooter}>
                    <div className={'links ' + classes.linksSlogans}>
                        {links?.map((link, index) => {
                            return (
                                <div
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={() => {
                                        handleOpen(link);
                                        setLinkProvide(link.linkAddress);
                                    }}
                                    key={index}
                                >
                                    <p
                                        style={{
                                            fontFamily,
                                            width: "100%",
                                            margin: 0,
                                            fontSize: `${12 + fontSizeGeneral}px`,
                                        }}
                                    >
                                        {rtl ? link.title : link.titleEN}
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

                <div className={'grid-md-2 ' + classes.contact}>
                    <h1 className="text-white" style={{ fontFamily }}>
                        {t("connect-us")}
                    </h1>

                    <div className={classes.socialIcons}>
                        {Object.entries(socialLinks).map(([key, value]) => (
                            <div
                                key={key}
                                onClick={() => window.open(value, "_blank")}
                                className={classes.icon}
                            >
                                <Image
                                    src={`/assets/svg/ico-${key}.svg`} // Adjust path as per your actual SVGs
                                    alt={key}
                                    width={24}
                                    height={24}
                                />
                            </div>
                        ))}
                    </div>

                    <ul className={'pages-links ' + classes.footerContent}>
                        <li
                            onClick={() => {
                                router.push("/");
                            }}
                            style={{ fontFamily }}
                        >
                            {t("home-route")}
                        </li>
                        <li
                            onClick={() => {
                                router.push("/about");
                            }}
                            style={{ fontFamily }}
                        >
                            {t("about")}
                        </li>
                        <li
                            onClick={() => {
                                router.push("/documents");
                            }}
                            style={{ fontFamily }}
                        >
                            {t("download")}
                        </li>
                        <li
                            onClick={() => {
                                router.push("/news");
                            }}
                            style={{ fontFamily }}
                        >
                            {t("news")}
                        </li>
                        <li
                            onClick={() => {
                                router.push("/faq");
                            }}
                            style={{ fontFamily }}
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

                <ExternalLinkModal
                    open={open}
                    handleClose={handleClose}
                    openLink={likeAndOpenLink}
                    link={selectedShortLink?.linkAddress}
                    data={selectedShortLink}
                    rtl={rtl}
                />
            </div>
        </div>
    );
};

export default Footer;
