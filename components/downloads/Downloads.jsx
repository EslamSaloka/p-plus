import React, { useEffect, useState } from "react";
import classes from "./downloads.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReactPaginate from "react-paginate";
import Subscribe from "../ui/Subscribe";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
import classestwo from "../home/Home-main/home-one.module.css";
const Downloads = ({ data, conversion, rtl }) => {
  const { t, i18n } = useTranslation();
  const { fontSizeGeneral } = useFontSize();
  const [filterTerm, setFilterTerm] = useState(data);
  const [currentPage, setCurrentPage] = useState(0);
  //Filter but selecting options
  const [selectedOption, setSelectedOption] = useState(6);

  const handleSelectChange = (event) => {
    setCurrentPage((prev) => {
      return 0;
    });
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setFilterTerm((prevData) => {
      return data.filter((item, index) => {
        return (
          index >= currentPage * selectedOption &&
          index < (currentPage + 1) * selectedOption
        );
      });
    });
  }, [currentPage, selectedOption]);

  // Function to search for a specific title in the array
  function searchByTitle(searchTerm) {
    // Convert the search term to lowercase for case-insensitive search
    const searchTermLower = searchTerm.toLowerCase().trim();

    // Filter the array to get objects that match the search term in their title
    const searchResults = data.filter((item) =>
      rtl
        ? item.title.includes(searchTermLower)
        : item.titleEN.toLowerCase().includes(searchTermLower)
    );
    setFilterTerm(searchResults);
  }

  //sorting section
  //Function to sort the array by dateCreated in ascending order
  const sortByDateAscending = () => {
    setFilterTerm((prevData) => {
      return [...prevData].sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
    });
  };

  const sortByDateDescending = () => {
    setFilterTerm((prevData) => {
      return [...prevData].sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
    });
  };
  const router = useRouter();
  //function to do the download for each document

  function downloadPdfFile(url, fileName) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Trigger a click event on the link to start the download
    link.click();
  }
  const [showBtn, setShowBtn] = useState(false);
  //side effect for showing arrow up Bottom when the window be in the second section or down
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
  //Handling clicking button up to the top of the page
  const handleClick = () => {
    const targetElement = document.getElementById("home");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={classes.downloadPage}>
      <div
        className={classes.choosen}
        style={{ direction: rtl ? "rtl" : "ltr" }}
      >
        <p>
          <span
            onClick={() => {
              router.push("/");
            }}
            style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
          >
            {t("home-route")}
          </span>
          <Image
            src="/assets/svg/Chevron.svg"
            width={16}
            height={16}
            style={{ transform: rtl ? "rotate(180deg)" : "" }}
            alt="chevron"
          />
        </p>
        <h1 style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
          {t("download")}
        </h1>
      </div>
      <div className={classes.downloadContent}>
        <p
          style={{
            fontSize: `${14 + fontSizeGeneral}px`,
            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
          }}
        >
          {rtl
            ? conversion.globalSettings?.downloadPageDescription
            : conversion.globalSettings?.downloadPageDescriptionEN}
        </p>
      </div>
      <div className={classes.downloadTables}>
        <div className={classes.filteringDocument}>
          <div className={classes.filterByNumber}>
            <FormLabel
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("show")}
            </FormLabel>
            <Select
              size="small"
              value={selectedOption}
              onChange={handleSelectChange}
              defaultValue={"6"}
            >
              <MenuItem value={1}>3</MenuItem>
              <MenuItem value={2}>4</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <FormLabel
              style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
            >
              {t("entries")}
            </FormLabel>
          </div>
          <Grid alignItems="center">
            <Grid
              item
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <FormLabel
                htmlFor="search"
                style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
              >
                {t("search")}
              </FormLabel>
              <TextField
                size="small"
                variant="outlined"
                placeholder={t("title")}
                onChange={(e) => searchByTitle(e.target.value)}
                id="search"
              />
            </Grid>
          </Grid>
        </div>
        <TableContainer
          component={Paper}
          sx={{ direction: rtl ? "rtl" : "ltr" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                    textAlign: rtl ? "right" : "left",
                  }}
                >
                  {t("title")}
                </TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "right",
                    gap: "10px",
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
                      onClick={sortByDateDescending}
                    />{" "}
                    <Image
                      src="/assets/svg/arrowUp.svg"
                      width={15}
                      height={15}
                      alt="arrow-up"
                      onClick={sortByDateAscending}
                      style={{ transform: "rotate(180deg)" }}
                    />{" "}
                  </div>
                  {t("date")}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                    textAlign: rtl ? "right" : "left",
                  }}
                >
                  {t("update")}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                    textAlign: rtl ? "right" : "left",
                  }}
                >
                  {t("action")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterTerm.map((document) => {
                const dateCreated = new Date(document.createdAt);
                const dateUpdated = new Date(document.updatedAt);
                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const formattedDate = dateCreated.toLocaleDateString(
                  i18n.language,
                  options
                );
                const formatteUpdate = dateUpdated.toLocaleDateString(
                  i18n.language,
                  options
                );
                const pdfUrl = `${document.fileUrl}`;
                return (
                  <TableRow key={document.id}>
                    <TableCell
                      style={{
                        fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                        textAlign: rtl ? "right" : "left",
                      }}
                    >
                      {rtl
                        ? document.title.slice(0, 30)
                        : document.titleEN.slice(0, 30)}
                      ...
                    </TableCell>
                    <TableCell sx={{ textAlign: rtl ? "right" : "left" }}>
                      {formattedDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: rtl ? "right" : "left" }}>
                      {formatteUpdate}
                    </TableCell>
                    <TableCell sx={{ textAlign: rtl ? "right" : "left" }}>
                      <button
                        className={classes.submitBtn}
                        onClick={() => {
                          downloadPdfFile(pdfUrl, document.title);
                        }}
                      >
                        <p
                          style={{
                            fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                          }}
                        >
                          {t("submit")}
                        </p>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.paginationContainer}>
          {/* Render pagination links with updated styles */}
          <ReactPaginate
            containerClassName={classes.pagination}
            pageClassName={classes.pageItem}
            activeClassName={classes.active}
            onPageChange={(event) => setCurrentPage(event.selected)}
            pageCount={Math.ceil(data.length / selectedOption)}
            onPageActive={currentPage}
            breakLabel="..."
            previousLabel={
              <div className={classes.paginationTerm}>{t("previous")}</div>
            }
            nextLabel={
              <div className={classes.paginationTerm}>{t("next")}</div>
            }
          />
        </div>
      </div>

      <Subscribe rtl={rtl} />
      {showBtn && (
        <div className={classestwo.btnUp} onClick={handleClick}>
          <Image
            src="/assets/svg/arrow-up.svg"
            width={15}
            height={15}
            alt="arrow-down"
            className={classestwo.arrowDown}
          />
        </div>
      )}
    </div>
  );
};

export default Downloads;
