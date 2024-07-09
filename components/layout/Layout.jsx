import React, { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { API_ROUTES } from "@/utils/apiConfig";
import toast, { Toaster } from "react-hot-toast";
import classes from "../ui/ui.module.css";
import Swal from "sweetalert2";
const Layout = (props) => {
  const {
    fontStyles,
    changeFontSize,
    isFeedbackVisible,
    handleToggleFeedback,
    conVersion,
    rtl,
    handleRtl,
    handleAccessibility,
    handleCaptilizling,
  } = props;
  const notify = () => toast("Your feedback has been sent.", { icon: "👏" });
  const handleSubmitFeedback = async (obj) => {
    try {
      const response = await axios.post(API_ROUTES.feedback.post, {
        name: obj.name,
        email: obj.email,
        phone: obj.phone,
        feedbackType: Number(obj.feedbackType),
        feedbackTitle: obj.feedbackTitle,
        feedbackMessage: obj.feedbackMessage,
      });
      {
        Swal.fire({
          title: response.data.errorMessage,
          icon: "success",
          customClass: {
            container: classes.customTitleAlert,
            title: classes.customTitleAlert,
            content: classes.customTitleAlert,
            confirmButton: classes.customTitleAlert,
            cancelButton: classes.customTitleAlert,
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!! something went wrong!",
        icon: "error",
        customClass: {
          container: classes.customTitleAlert,
          title: classes.customTitleAlert,
          content: classes.customTitleAlert,
          confirmButton: classes.customTitleAlert,
          cancelButton: classes.customTitleAlert,
        },
      });
    }
  };

  return (
    <div style={{ fontFamily: rtl ? "DINNext-Arabic-meduim !important" : "" }}>
      <Navbar
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={conVersion}
        handleSubmitFeedback={handleSubmitFeedback}
        rtl={rtl}
        handleRtl={handleRtl}
        handleCaptilizling={handleCaptilizling}
        handleAccessibility={handleAccessibility}
        changeFontSize={changeFontSize}
      />
      {props.children}

      <Toaster />
    </div>
  );
};

export default Layout;
