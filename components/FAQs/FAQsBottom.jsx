import { useTranslation } from "react-i18next";
import styles from "./faq.module.css";
import Image from "next/image";
const FAQsBottom = ({ phone, email, rtl }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.section1}>
                <p style={{fontFamily: rtl ? "DINNext-Arabic-meduim " : "",}}> {t("question")} </p>
                <h1 style={{fontFamily: rtl ? "DINNext-Arabic-meduim " : "",}}> {t("still-have-question")} </h1>
                <h4 style={{fontFamily: rtl ? "DINNext-Arabic-meduim " : "",}}>
                    {t("find-question-in-faq-contact-us-answer-shortly")}
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
                    <p style={{fontFamily: rtl ? "DINNext-Arabic-meduim " : "",}}> {t("always-happy-to-help")} </p>
                </div>
                <div className={styles.phoneEmail}>
                    <Image
                        src="/assets/imges/faq-email.png"
                        width={35}
                        height={35}
                        alt="phone"
                    />
                    <h1>{email}</h1>
                    <p style={{fontFamily: rtl ? "DINNext-Arabic-meduim " : "",}}> {t("best-way-quick-answer")} </p>
                </div>
            </div>
        </div>
    );
};

export default FAQsBottom;
