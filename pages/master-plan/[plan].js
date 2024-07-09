import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MasterPlanMain from "@/components/master-plan/MasterPlanMain";
 
import axios from "axios";
import { API_ROUTES } from "@/utils/apiConfig";
const index = ({ rtl, isFeedbackVisible, handleToggleFeedback, conVersion,dataInfo, dataMonitoring }) => {

  const router = useRouter();
  const plan = router.query.plan; 
  const [data, setData] = useState(dataInfo?.returnData); 
  const [dataChanged, setDataChanged] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  // setData(dataInfo?.returnData);
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(API_ROUTES.masterPlan.get);
  //       setData(response.data);
  //       setLoading(false);

  //       response.data[0].id = "root1"; 
  //       const newArray = [{children: dataInfo?.returnData.dataMasterPlanMenus, title: dataInfo?.returnData.title}]
          
  //       setDataChanged(newArray);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  
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
        direction: rtl? "rtl": "ltr"
      }}

    >
      <MasterPlanMain
        plan={plan}
        elementSelect={dataChanged[plan - 1] ? dataChanged[plan - 1].title : ""}
        data={[{children: dataInfo?.returnData.dataMasterPlanMenus, title: dataInfo?.returnData.title, titleEN: dataInfo?.returnData.titleEN, id: dataInfo?.returnData.id}]}
        conVersion={conVersion}
        rtl={rtl}
        pptUrl={dataInfo?.returnData.fileURL}
        videourl={dataInfo?.returnData.videoURL}
        monitor={dataMonitoring}
      />
    </div>
  );
};
export async function getServerSideProps(context) {
  const { params,query } = context;
  const { plan } = params;  
  try {
    const response = await axios.get(`${API_ROUTES.masterPlanInfo.get}/${plan}`);
    const monitorRes = query.id === '4'? await axios.get(`${API_ROUTES.monitoring.get}`) : ""
    // Check if the data exists
    if (!response.data.returnData) {
      return {
        notFound: true, // This will render the 404 page
      };
    }

    return {
      props: {
        dataInfo: response.data.returnData, 
        dataMonitoring: monitorRes? monitorRes.data.returnData:""
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    // Return a proper error page or handle it gracefully
    return {
      props: {
        error: 'There was an error fetching the data.',
      },
    };
  }
}
// This is needed for dynamic routes in Next.js
 
export default index;
