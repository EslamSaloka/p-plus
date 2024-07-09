import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
const Custom404 = ({rtl}) => {
  return (
    <div style={{textAlign: "center", padding: "50px", backgroundColor: "#fff", color: "#000", height: "85vh",  }}>
       <Image src="/assets/imges/404.jpg" width={600} height={400} alt='404'/>
      <p style={{fontWeight: "bold", fontSize: "18px", fontFamily: "DINNext-Regular", marginBottom: "40px"}} >{rtl? "يبدو ان الصفحة التي تريدها غير موجودة": "Oops! The page you're looking for cannot be  found."}</p>
      <Link href="/" className='notFound'>
        {rtl? "إذهب إلى الصفحة الرئيسية": " Go back to the homepage "}
      </Link>
    </div>
  );
};

export default Custom404;