"use client";
import React, { useEffect, useRef, useState } from "react";
import classes from "./masterPlan.module.css";
import WelcomeDialog from "../ui/WelcomeToGaca";
import { Document, Page, pdfjs } from "react-pdf";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import MasterPlanTable from "./MasterPlanTable";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
} from "@mui/material";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MasterPlan = ({
    singleElem,
    pptFile,
    videoUrl,
    rtl,
    switching,
    monitor,
}) => {
    const router = useRouter();
    const { t } = useTranslation();
    const [openVid, setOpenVid] = useState(false);
    const [numPages, setNumPages] = useState(null);

    const handleClose = () => {
        setOpenVid(false);
    };

    const handleOpenVideo = () => {
        setOpenVid(true);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className={classes.sideContent}>
            <div className={classes.contentPlan}>
                <div>
                    {openVid && (
                        <WelcomeDialog videoUrl={videoUrl} onClose={handleClose} />
                    )}
                    {!switching && (
                        <button
                            className={classes.videoShow}
                            onClick={handleOpenVideo}
                            style={{
                                float: rtl ? "left" : "right",
                                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                            }}
                        >
                            {t("video-tutorial")}
                        </button>
                    )}
                </div>
                {!switching ? (
                    <div className={classes.documentMasterPlan}>
                        <Document
                            file={`/assets/pdf/LAYER${router.query.id}.pdf`}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={
                                <div style={{ position: "fixed", left: "50%", top: "60%" }}>
                                    <span className="loaderPdf"></span>
                                    <p style={{ color: "#000", fontSize: "15px" }}>Loading...</p>
                                </div>
                            }
                            error={<div>Failed to load PPTX. Please try again later.</div>}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                            ))}
                        </Document>
                    </div>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHover}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                                            }}
                                        >
                                            {" "}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-up"
                                                />{" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-down"
                                                    style={{ transform: "rotate(180deg)" }}
                                                />{" "}
                                            </div>
                                            {t("code")}
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.tableHover}>
                                        {" "}
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                                            }}
                                        >
                                            {" "}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-up"
                                                />{" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-down"
                                                    style={{ transform: "rotate(180deg)" }}
                                                />{" "}
                                            </div>
                                            {t("title")}
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.tableHover}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                                            }}
                                        >
                                            {" "}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-up"
                                                />{" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-down"
                                                    style={{ transform: "rotate(180deg)" }}
                                                />{" "}
                                            </div>
                                            {t("start-date")}
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.tableHover}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                                            }}
                                        >
                                            {" "}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-up"
                                                />{" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-down"
                                                    style={{ transform: "rotate(180deg)" }}
                                                />{" "}
                                            </div>
                                            {t("finish-date")}
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.tableHover}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                                            }}
                                        >
                                            {" "}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-up"
                                                />{" "}
                                                <Image
                                                    src="/assets/svg/arrowUp.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="arrow-down"
                                                    style={{ transform: "rotate(180deg)" }}
                                                />{" "}
                                            </div>
                                            {t("implement-progress")}
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableHover}
                                        style={{
                                            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                                        }}
                                    >
                                        {t("download-report")}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {monitor.map((data) => {
                                    return <MasterPlanTable data={data} rtl={rtl} />;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

export default MasterPlan;
