import React, { useEffect, useState } from "react";
import classes from "./news.module.css";
import Subscribe from "../ui/Subscribe";
import SingleCard from "./SingleCard";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

import classestwo from "../home/Home-main/home-one.module.css";
const NewsMain = ({ dataNews, rtl }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [leftRight, setLeftRight] = useState("left");
  const [filterData, setFilterData] = useState([]);
  const [news, setNewsData] = useState(dataNews.data);
  const router = useRouter();
  const { t } = useTranslation();
  const itemsPerPage = 15;
  useEffect(() => {
    setFilterData(
      news.filter((item, index) => {
        return (
          (index >= currentPage * itemsPerPage) &
          (index < (currentPage + 1) * itemsPerPage)
        );
      })
    );
  }, [currentPage, dataNews]);
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
    <div
      className={classes.newsMain}
      style={{ direction: rtl ? "rtl" : "ltr" }}
    >
      <div className={classes.newsSection}>
        <div className={classes.choosen}>
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
              width={14}
              height={14}
              alt="chevron"
              layout="responsive"
              style={{ transform: rtl ? "rotate(180deg)" : "" }}
            />
          </p>
          <h1 style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
            {t("news")}
          </h1>
        </div>
        <div className={classes.newsCardMain2}>
          {filterData &&
            filterData.map((nws, index) => (
              <SingleCard
                key={nws.id}
                {...nws}
                rtl={rtl}
                leftRight={leftRight}
              />
            ))}
        </div>
        <div className={classes.paginationContainer}>
          {/* Render pagination links with updated styles */}
          <ReactPaginate
            containerClassName={classes.pagination}
            pageClassName={classes.pageItem}
            activeClassName={classes.active}
            onPageChange={(event) => setCurrentPage(event.selected)}
            pageCount={Math.ceil(news.length / itemsPerPage)}
            breakLabel="..."
            previousLabel={
              <div className={classes.paginationTerm}>
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={12}
                  height={12}
                  alt="expand-more"
                  style={{ transform: "rotate(180deg)" }}
                />
              </div>
            }
            nextLabel={
              <div className={classes.paginationTerm}>
                <Image
                  src="/assets/svg/chevron-right.svg"
                  width={12}
                  height={12}
                  alt="expand-more"
                />
              </div>
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

export default NewsMain;
