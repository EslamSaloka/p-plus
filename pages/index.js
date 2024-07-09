import HomePage from "@/components/home/HomePage"; 
import axios from "axios";
export default function Home({
  isFeedbackVisible,
  handleToggleFeedback,
  conVersion,
  data, 
  rtl
}) { 
  return (
    <div>
      <HomePage
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={conVersion}
        dataHome={data}
        rtl={rtl}
      />
    </div>
  );
}

export async function getStaticProps() {
  // Implement cache logic here
  try {
    const response = await axios.get('https://snap.somee.com/api/home'); 
    console.log(response)
    return {
      props: {
        data: response.data.returnData, 
      },
      revalidate: 10, // Cache validation time in seconds
  }
 } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
