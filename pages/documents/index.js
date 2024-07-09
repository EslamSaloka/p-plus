import React, { useEffect, useState } from "react";
import Downloads from "@/components/downloads/Downloads";
import Footer from "@/components/footer/footer";
import axios from "axios";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { API_ROUTES } from "@/utils/apiConfig";
const index = ({ isFeedbackVisible, handleToggleFeedback, conVersion, dataDownload,rtl }) => {
  const [data, setData] = useState(dataDownload); 
 
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
      <Downloads data={data} conversion={conVersion} rtl={rtl}/>
      <Footer conVersion={conVersion} rtl={rtl} />
    </div>
  );
};

export async function getStaticProps(){
   try{
     const response = await axios.get(API_ROUTES.downloads.get); 
     return{
       props:{
         dataDownload: response.data.returnData,
       },
       revalidate: 10,
     }
   }catch(error){
     console.log("Error fetching data:", error); 
     return null;
   }
}

export default index;
