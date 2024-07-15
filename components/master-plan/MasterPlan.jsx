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
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("code");

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleClose = () => {
        setOpenVid(false);
    };

    const handleOpenVideo = () => {
        setOpenVid(true);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const sortedMonitor = [...monitor].sort((a, b) => {
        if (orderBy === "code") {
            return (order === "asc" ? 1 : -1) * a.code.localeCompare(b.code);
        } else if (orderBy === "title") {
            return (order === "asc" ? 1 : -1) * a.title.localeCompare(b.title);
        } else if (orderBy === "start-date") {
            return (order === "asc" ? 1 : -1) * new Date(a.startDate) - new Date(b.startDate);
        } else if (orderBy === "finish-date") {
            return (order === "asc" ? 1 : -1) * new Date(a.finishDate) - new Date(b.finishDate);
        } else if (orderBy === "implement-progress") {
            return (order === "asc" ? 1 : -1) * a.implementProgress - b.implementProgress;
        }
        return 0;
    });

    const fontFamily = rtl ? "DINNext-Arabic-meduim" : "";


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
                                fontFamily,
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
                    <TableContainer className="table-wrapper" component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        className={`${orderBy === 'code' ? order : ''} ${classes.tableHover}`}
                                        style={{ fontFamily }}
                                        onClick={() => handleRequestSort("code")}>
                                        <TableSortLabel
                                            active={orderBy === "code"}
                                            direction={orderBy === "code" ? order : "asc"}

                                        >
                                            {t("code")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                        className={`${orderBy === 'title' ? order : ''} ${classes.tableHover}`}
                                        style={{ fontFamily }}
                                        onClick={() => handleRequestSort("title")}>
                                        <TableSortLabel
                                            active={orderBy === "title"}
                                            direction={orderBy === "title" ? order : "asc"}

                                        >
                                            {t("title")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                        className={`${orderBy === 'startDate' ? order : ''} ${classes.tableHover}`}
                                        style={{ fontFamily }}
                                        onClick={() => handleRequestSort("startDate")}>
                                        <TableSortLabel
                                            active={orderBy === "startDate"}
                                            direction={orderBy === "startDate" ? order : "asc"}

                                        >
                                            {t("start-date")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                        className={`${orderBy === 'finishDate' ? order : ''} ${classes.tableHover}`}
                                        style={{ fontFamily }}
                                        onClick={() => handleRequestSort("finishDate")}>
                                        <TableSortLabel
                                            active={orderBy === "finishDate"}
                                            direction={orderBy === "finishDate" ? order : "asc"}

                                        >
                                            {t("finish-date")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                        className={`${orderBy === 'implementProgress' ? order : ''} ${classes.tableHover}`}
                                        style={{ fontFamily }}
                                        onClick={() => handleRequestSort("implementProgress")}>
                                        <TableSortLabel
                                            active={orderBy === "implementProgress"}
                                            direction={orderBy === "implementProgress" ? order : "asc"}

                                        >
                                            {t("implement-progress")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                        className={'no-sort ' + classes.tableHover}
                                        style={{ fontFamily }}
                                    >
                                        {t("download-report")}
                                    </TableCell>
                                </TableRow >
                            </TableHead >
                            <TableBody>
                                {monitor.map((data) => {
                                    return <MasterPlanTable data={data} rtl={rtl} />;
                                })}
                            </TableBody>
                        </Table >
                    </TableContainer >
                )}
            </div >
        </div >
    );
};

export default MasterPlan;
