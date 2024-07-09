import styles from "./faq.module.css";
import Image from "next/image";
const FAQsBottom = ({ phone, email }) => {
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <p>Question?</p>
        <h1>You still have a question?</h1>
        <h4>
          if you can't find question in our FAQ, you can contact us. We'll
          answer you shortly!
        </h4>
      </div>
      <div className={styles.section2}>
        <div className={styles.phoneEmail}>
          <Image
            src="/assets/imges/faq-phone.png"
            width={35}
            height={35}
            alt="phone"
          />
          <h1>{phone}</h1>
          <p>We are always happy to help</p>
        </div>
        <div className={styles.phoneEmail}>
          <Image
            src="/assets/imges/faq-email.png"
            width={35}
            height={35}
            alt="phone"
          />
          <h1>{email}</h1>
          <p>Best way to get a quick answer</p>
        </div>
      </div>
    </div>
  );
};

export default FAQsBottom;
