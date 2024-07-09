import React, { useEffect, useState } from "react";
import NewsMain from "@/components/news/NewsMain";
import Footer from "@/components/footer/footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import axios from "axios";
import { API_ROUTES } from "@/utils/apiConfig";
const index = ({ isFeedbackVisible, handleToggleFeedback, conVersion, dataNews, rtl }) => {
 
  const [data, setData] = useState(dataNews); 
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
      <NewsMain dataNews={data} rtl={rtl} />
      <Footer conVersion={conVersion} rtl={rtl} />
    </div>
  );
};
export async function getStaticProps(){
  try{
    const response = await axios.get(API_ROUTES.blogs.get); 
    return{
      props:{
        dataNews: response.data.returnData,
      },
      revalidate: 10,
    }
  }catch(error){
    console.log("Error fetching data:", error); 
    return null;
  }
}

export default index;
