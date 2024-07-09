import React, { useEffect, useState } from "react";
import {
  TableCell,
  TableRow,
  LinearProgress,
  Typography,
  Box,
  Button,
  Popover,
} from "@mui/material";
import parse from "html-react-parser";
import classes from "./masterPlan.module.css";
import { API_ROUTES } from "@/utils/apiConfig";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Link from "next/link";
const MasterPlanTable = ({ data, rtl }) => {
  const [clickCode, setClickCode] = useState(false);
  const [codeFetching, setCodeFetchign] = useState([]);
  const { t } = useTranslation();
  //Handling click code to fetch the api
  const handleCodeClick = () => {
    setClickCode(!clickCode);
  };
  const percentage = (Math.random() * 100).toFixed(2);
  const dateStart = new Date(data.projectStartDate);
  const dateEnd = new Date(data.projectEndDate);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formattedDateStart = dateStart.toLocaleDateString(
    rtl ? "ar-EG" : "en-US",
    options
  );
  const formattedDateEnd = dateEnd.toLocaleDateString(
    rtl ? "ar-EG" : "en-US",
    options
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  //side Effect for fetching the data after clicking code
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(codeFetching.length === 0 && clickCode);
        if (codeFetching.length === 0 && clickCode) {
          const response = await axios.get(
            API_ROUTES.monitoring.get + `/${data.id}`
          );
          setCodeFetchign(response.data.returnData);
          console.log(response.data.returnData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setCodeFetchign, clickCode, codeFetching]);

  //handle show report button

  return (
    <>
      <TableRow key={data.id}>
        <TableCell onClick={handleCodeClick}>
          <p style={{ cursor: "pointer" }}>
            {" "}
            {clickCode ? <CiSquareMinus /> : <CiSquarePlus />} {data.code}
          </p>
        </TableCell>
        <TableCell>
          {" "}
          <div>
            <Typography
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              className={classes.tableHover}
            >
              {rtl ? data.title : data.titleEN}
            </Typography>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",

                // Ensure the popover has a solid background
                boxShadow: 3, // Add some shadow for better visibility
                borderRadius: 1, // Optional: add some rounding to the corners
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography
                sx={{
                  p: 1,
                  color: "black", // Ensure text is visible
                  backgroundColor: "white", // Ensure the typography background matches the popover
                }}
              >
                {parse(rtl ? data.description : data.descriptionEN)}
              </Typography>
            </Popover>
          </div>
        </TableCell>
        <TableCell>{formattedDateStart}</TableCell>
        <TableCell>{formattedDateEnd}</TableCell>
        <TableCell>
          <div
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <Box sx={{ width: "70%", color: "#63c69a" }}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={data.percentage}
                sx={{
                  height: 20,
                  borderRadius: "3px",
                }}
              />
            </Box>
            <Typography
              variant="body1"
              align="center"
              sx={{
                position: "absolute",
                top: "50%",
                left: rtl ? "60%" : "35%",
                transform: "translate(-50%, -50%)",
                zIndex: 99,
                color: "#000",
              }}
            >
              {data.percentage}%
            </Typography>
          </div>
        </TableCell>
        <TableCell>
          {" "}
          <Link href={`/report/${data.id}`}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#63c69a",
                width: "50%",
                fontSize: "12px",
              }}
            >
              {t("show")}
            </Button>
          </Link>
        </TableCell>
      </TableRow>
      {clickCode &&
        codeFetching?.map((codeData) => {
          const dateStart = new Date(codeData.startDate);
          const dateEnd = new Date(codeData.endDate);
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          };
          const formattedDateStart = dateStart.toLocaleDateString(
            rtl ? "ar-EG" : "en-US",
            options
          );
          const formattedDateEnd = dateEnd.toLocaleDateString(
            rtl ? "ar-EG" : "en-US",
            options
          );

          return (
            <TableRow key={codeData.projectId}>
              <TableCell style={{ paddingLeft: rtl ? "0px" : "40px" }}>
                {" "}
                {data.code}
              </TableCell>
              <TableCell style={{ paddingLeft: rtl ? "0px" : "40px" }}>
                {" "}
                <Typography>
                  {rtl ? codeData.title : codeData.titleEN}
                </Typography>
              </TableCell>
              <TableCell style={{ paddingLeft: rtl ? "0px" : "40px" }}>
                {formattedDateStart}
              </TableCell>
              <TableCell style={{ paddingLeft: rtl ? "0px" : "40px" }}>
                {formattedDateEnd}
              </TableCell>
              <TableCell>
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{ width: "70%", color: "#63c69a", marginLeft: "30px" }}
                  >
                    <LinearProgress
                      color="inherit"
                      variant="determinate"
                      value={codeData.percentage}
                      sx={{
                        height: 20,
                        borderRadius: "3px",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: rtl ? "60%" : "60%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 99,
                      color: "#000",
                    }}
                  >
                    {codeData.percentage}%
                  </Typography>
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          );
        })}
    </>
  );
};
export default MasterPlanTable;
