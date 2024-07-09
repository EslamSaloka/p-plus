import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import classes from "./ui.module.css";
import { useTranslation } from "react-i18next";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
  } from 'node_modules/react-simple-captcha';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogModalSubscribe = ({ open, handleClose, openLink, link }) => {
  const {t, i18n} = useTranslation(); 
  
    const doSubmit = () => {
    let user_captcha = document.getElementById("user_captcha_input").value;
    if (validateCaptcha(user_captcha) == true) {
      alert("Captcha Matched");
      loadCaptchaEnginge(8);
      document.getElementById("user_captcha_input").value = "";
    } else {
      alert("Captcha Does Not Match");
      document.getElementById("user_captcha_input").value = "";
    }
  };
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          overflowY: "unset",
          overflowX: "unset",
          direction: i18n.language === 'ar'? "rtl":"ltr"
        },
      }}
      
    >
      <div style={{ position: "relative" }}>
        <div className={classes.closeBtn} onClick={handleClose}>
          <Image src="/assets/svg/x.svg" width={17} height={17} alt="x" />
        </div>
        <div style={{ padding: 8 }}>
          <DialogTitle style={{ color: "#4B465C" }}>{t("alert-header")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               {t("alert-message")}
            </DialogContentText>
            <div className="form-group">
        <div className="col mt-3">
          <LoadCanvasTemplate />
        </div>

        <div className="col mt-3">
          <div>
            <input
              placeholder="Enter Captcha Value"
              id="user_captcha_input"
              name="user_captcha_input"
              type="text"
            ></input>
          </div>
        </div>

        <div className="col mt-3">
          <div>
            <button class="btn btn-primary" onClick={doSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
          </DialogContent>
          <DialogActions sx={{display: "flex", gap: "10px"}}>
            <button
              variant="contained"
              color="inherit"
              onClick={handleClose}
              className={classes.btnCancel}
            >
              {t('cancel')}
            </button>
            <button
              variant="contained"
              color="success"
              onClick={() => {
                // Add your custom logic here
                openLink(link);
                handleClose();
              }}
              className={classes.btnSuccess}
            >
              {t('confirm')}
            </button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogModalSubscribe;
