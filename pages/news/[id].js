import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SingleNews from "@/components/singleNews/SingleNews";
import Footer from "@/components/footer/footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import axios from "axios";
import { API_ROUTES } from "@/utils/apiConfig";
const NewsId = ({ isFeedbackVisible, handleToggleFeedback, conVersion,rtl }) => {
  const router = useRouter();
  const id = router.query.id;
 
  if (!id) {
    return <LoadingSpinner />;
  }
  return (
    <div
      onClick={() => {
        isFeedbackVisible ? handleToggleFeedback() : null;
      }}
      style={{
        filter: isFeedbackVisible ? "brightness(0.5)" : " ",
        transition: "all 0.6s ease-in-out",
        height: isFeedbackVisible ? "Calc(100vh - 111px)" : "",
        overflow: isFeedbackVisible ? "hidden" : "",
      }}
    >
      <SingleNews id={id} conVersion={conVersion} rtl={rtl} />

      <Footer conVersion={conVersion} rtl={rtl} />
    </div>
  );
};

export default NewsId;
