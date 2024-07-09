import React from "react";
import ReportPage from "@/components/report/Report";
import { API_ROUTES } from "@/utils/apiConfig";
import axios from "axios";
const report = ({ data }) => {
 
  return (
    <div style={{ background: "#fff", color: "#000", height: "100vh" }}>
      <ReportPage data={data} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params, query } = context;
  const { id } = params;
  const urlMonitor = `${API_ROUTES.monitoring.get}/${id}/report`;
  try {
    const response = await axios.get(urlMonitor);
    if (!response.data.returnData) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data: response.data.returnData.returnData,
      }, 
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
}

export default report;
