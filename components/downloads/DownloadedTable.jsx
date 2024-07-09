import React from "react";
import classes from "./downloads.module.css";
import Image from "next/image";
import { API_ROUTES } from "@/utils/apiConfig";
const DownloadedTable = ({ fileName, date, fileSize, docUrl }) => {
  const dateCreated = new Date(date);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateCreated.toLocaleDateString(undefined, options);

  function downloadPdfFile(url, fileName) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Trigger a click event on the link to start the download
    link.click();
  }
  const pdfUrl = `${docUrl}`;
  return (
    <div className={classes.downloadTable}>
      <div className={classes.tableHead}>
        <p>
          {" "}
          <Image
            src="/assets/svg/Document.svg"
            width={18}
            height={18}
            alt="document"
          />
          {fileName}
        </p>
        <p>{formattedDate}</p>
        <p>{fileSize}</p>
        <p
          onClick={() => {
            downloadPdfFile(pdfUrl, fileName);
          }}
        >
          Downloads
        </p>
      </div>
    </div>
  );
};

export default DownloadedTable;
