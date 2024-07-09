import React, { useEffect, useState } from "react";
import AboutPage from "@/components/about/AboutPage";
import Footer from "@/components/footer/footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { API_ROUTES } from "@/utils/apiConfig";
import axios from "axios";
const index = ({ isFeedbackVisible, handleToggleFeedback, conVersion, dataInfo, rtl }) => {
  const [data, setData] = useState(dataInfo); 
   
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(API_ROUTES.about.get);

  //       setData(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // if (loading) {
  //   return <LoadingSpinner />;
  // }
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
      <AboutPage data={data} rtl={rtl} />
      <Footer conVersion={conVersion} rtl={rtl} />
    </div>
  );
};

export async function getStaticProps(){
   try{
     const response = await axios.get(API_ROUTES.about.get); 
     return{
       props:{
         dataInfo: response.data.returnData,
       }, 
       revalidate: 10
     }
   }catch(error){
     console.log("Error fetch about page", error); 
     return null
   }
}
export default index;
