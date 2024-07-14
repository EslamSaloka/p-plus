import React from "react";
import styles from "./report.module.css";
import Image from "next/image";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
        operatingEnvironmentAirport,
        operatingEnvironmentTerminal,
        operatingEnvironmentACC,
        operatingEnvironmentNotApplicable,
    } = data.projectInformation;

    //Parse the ISO date string into a date object
    const startDate = new Date(projectStartDate);
    const endDate = new Date(projectEndDate);
    //Extract the day, month, and year start project
    const dayStart = startDate.getUTCDate();
    const monthStart = startDate.getUTCMonth() + 1;
    const yearStart = startDate.getFullYear();
    //Extract the day, month, and year of end project
    const dayEnd = endDate.getUTCDate();
    const monthEnd = endDate.getUTCMonth() + 1;
    const yearEnd = endDate.getFullYear();
    //Formated the date as dd/mm/yy
    const formattedStart = `${dayStart}/${monthStart}/${yearStart}`;
    const formattedEnd = `${dayEnd}/${monthEnd}/${yearEnd}`;

    //calculating the completion of the projects
    const statusText = percentage < 85 ? "Late" : "Done";

    const years = [];
    for (let year = yearStart;year <= yearEnd;year++) {
        years.push(year);
    }

    const activityData = new Array(years.length).fill(0);
    data.projectActivities.forEach(activity => {
        const activityStartYear = new Date(activity.startDate).getFullYear();
        const activityEndYear = new Date(activity.endDate).getFullYear();
        const percentage = parseFloat(activity.percentage);

        for (let year = activityStartYear;year <= activityEndYear;year++) {
            const index = years.indexOf(year);
            if (index !== -1) {
                activityData[index] = percentage;
            }
        }
    });

    const chartData = {
        labels: years,
        datasets: [
            {
                label: 'Activities',
                data: activityData,
                fill: true,
                backgroundColor: 'rgba(137, 165, 78, 1)',
                borderColor: 'rgba(137, 165, 78, 1)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className={styles.container}>
            <div className={styles.reportHeader}>
                <h1>{data.projectInformation.titleEN}</h1>
                <p>{projectStartDate}</p>
            </div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.section1}>
                                <p> Stakholders </p>
                            </div>
                        </td>
                        <td>
                            <div className={styles.stakholderValue}>
                                {data.projectStakeholders.map((stakeholder, index) => (
                                    <p key={index}>{stakeholder.userName}</p>
                                ))}
                            </div>
                        </td>
                        <td>
                            <div className={styles.section1}>
                                <p> Expected Benefits </p>
                            </div>
                        </td>
                        <td style={{ padding: "0px" }}>
                            <div className={styles.benefitImages}>
                                <div className={styles.imges}>
                                    {expectedBenefitCapacity &&
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
                                                Capacity
                                            </p>
                                        </div>
                                    }
                                    {expectedBenefitOprationalEfficiency &&
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
                                                Operational efficiency
                                            </p>
                                        </div>
                                    }
                                    {expectedBenefitCostEfficiency &&
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
                                                Cost efficiency
                                            </p>
                                        </div>
                                    }
                                </div>
                                <div className={styles.imges}>
                                    {expectedBenefitSafety &&
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
                                                Saftey
                                            </p>
                                        </div>
                                    }
                                    {expectedBenefitEnvironment &&
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
                                                Enviroment
                                            </p>
                                        </div>
                                    }
                                    {expectedBenefitSecurity &&
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
                                                Security
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.section1}>
                                <p> Project Start </p>
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
                                <p> Project owner </p>
                            </div>
                        </td>
                        <td>{data.projectOwner.userName}</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.section1}>
                                <p> Project End </p>
                            </div>
                        </td>
                        <td>
                            <div className={styles.section1}>
                                <p>{formattedEnd}</p>
                            </div>
                        </td>
                        <td>
                            <div className={styles.section1}>
                                <p> Operation Environment </p>
                            </div>
                        </td>
                        <td>
                            {operatingEnvironmentAirport &&
                                <p> Airport </p>
                            }
                            {operatingEnvironmentTerminal &&
                                <p> Terminal </p>
                            }
                            {operatingEnvironmentACC &&
                                <p> ACC </p>
                            }
                            {operatingEnvironmentNotApplicable &&
                                <p> Not Applicable </p>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.section1}>
                                <p> Status </p>
                            </div>
                        </td>
                        <td style={{ background: percentage < 85 ? "yellow" : "green" }}>
                            <span style={{ display: 'flex' }}>{statusText}</span>
                        </td>
                        <td>
                            <div className={styles.section1}>
                                <p> Activities </p>
                            </div>
                        </td>
                        <td>
                            <Line data={chartData} options={options} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};
export default ReportPage;
