import React from "react";
import styles from "./report.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const ReportPage = ({ data }) => {
    const {
        expectedBenefitCapacity,
        expectedBenefitOprationalEfficiency,
        expectedBenefitCostEfficiency,
        expectedBenefitSafety,
        expectedBenefitEnvironment,
        expectedBenefitSecurity,
        projectStartDate,
        projectEndDate,
        percentage,
    } = data.projectInformation;

    //Parse the ISO date string into a date object
    const startDate = new Date(projectStartDate);
    const endDate = new Date(projectEndDate);
    //Extract the day, month, and year start project
    const dayStart = startDate.getUTCDate();
    const monthStart = startDate.getUTCMonth() + 1;
    const yearStart = startDate.getUTCFullYear();
    //Extract the day, month, and year of end project
    const dayEnd = endDate.getUTCDate();
    const monthEnd = endDate.getUTCMonth() + 1;
    const yearEnd = endDate.getUTCFullYear();
    //Formated the date as dd/mm/yy
    const formattedStart = `${dayStart}/${monthStart}/${yearStart}`;
    const formattedEnd = `${dayEnd}/${monthEnd}/${yearEnd}`;

    //calculating the completion of the projects
    const statusText = percentage < 85 ? "Late" : "Done";
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.reportHeader}>
                <h1>{data.projectInformation.titleEN}</h1>
            </div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.section1}>
                                <p> {t("stakeholders")} </p>
                            </div>
                        </td>
                        <td>
                            <div className={styles.stakholderValue}>
                                <p>ANSPs</p>
                                <p>Military</p>
                                <p>Regulators</p>
                            </div>
                        </td>
                        <td>
                            <div className={styles.section1}>
                                <p> {t("expected-benefits")} </p>
                            </div>
                        </td>
                        <td style={{ padding: "0px" }}>
                            <div className={styles.benefitImages}>
                                <div className={styles.imges}>
                                    <div className={styles.singleImage}>
                                        <Image
                                            src={`/assets/imges/${expectedBenefitCapacity
                                                ? "capacity-blue.png"
                                                : "capacity-gray.png"
                                                } `}
                                            width={50}
                                            height={50}
                                            alt="capacity"
                                        />
                                        <p
                                            style={{
                                                color: expectedBenefitCapacity ? "#4752a3" : "gray",
                                            }}
                                        >
                                            {t("capacity")}
                                        </p>
                                    </div>
                                    <div className={styles.singleImage}>
                                        <Image
                                            src={`/assets/imges/${expectedBenefitOprationalEfficiency
                                                ? "operation-blue.png"
                                                : "operation-gray.png"
                                                }`}
                                            width={50}
                                            height={50}
                                            alt="operational"
                                        />
                                        <p
                                            style={{
                                                color: expectedBenefitOprationalEfficiency
                                                    ? "#4752a3"
                                                    : "gray",
                                            }}
                                        >
                                            {t("operational-efficiency")}
                                        </p>
                                    </div>
                                    <div className={styles.singleImage}>
                                        <Image
                                            src={`/assets/imges/${expectedBenefitCostEfficiency
                                                ? "cost-blue.png"
                                                : "cost-gray.png"
                                                }`}
                                            width={50}
                                            height={50}
                                            alt="cosy"
                                        />
                                        <p
                                            style={{
                                                color: expectedBenefitCostEfficiency
                                                    ? "#4752a3"
                                                    : "gray",
                                            }}
                                        >
                                            {t("cost-efficiency")}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.imges}>
                                    <div className={styles.singleImage}>
                                        <Image
                                            src={`/assets/imges/${expectedBenefitSafety
                                                ? "seat-blue.png"
                                                : "seat-gray.png"
                                                }`}
                                            width={50}
                                            height={50}
                                            alt="Saftely"
                                        />
                                        <p
                                            style={{
                                                color: expectedBenefitSafety ? "#4752a3" : "gray",
                                            }}
                                        >
                                            {t("safety")}
                                        </p>
                                    </div>
                                    <div className={styles.singleImage}>
                                        <Image
                                            src={`/assets/imges/${expectedBenefitEnvironment
                                                ? "evniroment-blue.png"
                                                : "enviroment-gray.png"
                                                }`}
                                            width={50}
                                            height={50}
                                            alt="enviroment"
                                        />
                                        <p
                                            style={{
                                                color: expectedBenefitEnvironment ? "#4752a3" : "gray",
                                            }}
                                        >
                                            {t("environment")}
                                        </p>
                                    </div>
                                    <div className={styles.singleImage}>
                                        <Image
                                            src={`/assets/imges/${expectedBenefitSecurity
                                                ? "secure-blue.png"
                                                : "secure-gray.png"
                                                }`}
                                            width={50}
                                            height={50}
                                            alt="security"
                                        />
                                        <p
                                            style={{
                                                color: expectedBenefitSecurity ? "#4752a3" : "gray",
                                            }}
                                        >
                                            {t("security")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.section1}>
                                <p> {t("project-start")} </p>
                            </div>
                        </td>
                        <td>
                            {" "}
                            <div className={styles.section1}>
                                <p>{formattedStart}</p>
                            </div>
                        </td>
                        <td>
                            {" "}
                            <div className={styles.section1}>
                                <p> {t("project-owner")} </p>
                            </div>
                        </td>
                        <td>Row 2, Column 2</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.section1}>
                                <p> {t("project-end")} </p>
                            </div>
                        </td>
                        <td>
                            <div className={styles.section1}>
                                <p>{formattedEnd}</p>
                            </div>
                        </td>
                        <td>Row 2, Column 2</td>
                        <td>Row 2, Column 2</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.section1}>
                                <p> {t("status")} </p>
                            </div>
                        </td>
                        <td style={{ background: percentage < 85 ? "yellow" : "green" }}>
                            <div className={styles.section1}>
                                <p>{statusText}</p>
                            </div>
                        </td>
                        <td>Row 2, Column 2</td>
                        <td>Row 2, Column 2</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default ReportPage;
