import React, { useEffect, useRef, useState } from "react";
import classes from "./home-one.module.css";
import Image from "next/image";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { API_ROUTES } from "@/utils/apiConfig";
import Swal from "sweetalert2";
const Feedback = ({ isFeedbackVisible, handleToggleFeedback, rtl }) => {
  const notify = () => toast("Your feedback has been sent.", { icon: "👏" });
  const [focusedInput, setFocusedInput] = useState(null);
  const [sendFeedback, setSendFeedback] = useState(false);
  const [initialForms, setInitialForms] = useState({
    name: "",
    email: "",
    phone: "",
    feedbackType: "",
    feedbackTitle: "",
    feedbackMessage: "",
  });
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };
  const inputRef = useRef("");
  const formik = useFormik({
    initialValues: initialForms,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]+$/, "Phone number must contain only numbers")
        .min(11, "Phone number must be more than 11 numbers long"),
      feedbackType: Yup.string().required("Feedback type is required"),
      feedbackTitle: Yup.string().required("Feedback title is required"),
      feedbackMessage: Yup.string().required("Feedback message is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission here
      setSendFeedback(true);
      try {
        const response = await axios.post(API_ROUTES.feedback.post, {
          name: values.name,
          email: values.email,
          phone: values.phone,
          feedbackType: Number(values.feedbackType),
          feedbackTitle: values.feedbackTitle,
          feedbackMessage: values.feedbackMessage,
        });
        handleToggleFeedback();

        notify();
      } catch (error) {
        console.log(error);
      }
      setSendFeedback(false);
    },
  });
  useEffect(() => {
    formik.resetForm();
  }, [isFeedbackVisible]);
  return (
    <div
      className={`${classes.feedbackSection} ${
        isFeedbackVisible ? classes.visible : ""
      }`}
      style={{ direction: rtl ? "rtl" : "" }}
    >
      <div className={classes.feedbackContent}>
        <h2>
          {rtl ? "اقتراحات وشكاوي" : "Feedback"}{" "}
          <Image
            src="/assets/svg/exit.svg"
            width={27}
            height={27}
            className={classes.exitImage}
            onClick={handleToggleFeedback}
            alt="exit"
          />
        </h2>
        <form onSubmit={formik.handleSubmit} className={classes.formsInput}>
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "name" ? classes.inputLabelFocused : null
            } ${
              formik.errors.name && formik.touched.name
                ? classes.inputLabelError
                : null
            }`}
          >
            <label htmlFor="name">
              Name{formik.touched.name && formik.errors.name ? "*" : null}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              ref={inputRef}
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onFocus={() => handleInputFocus("name")}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <span className={classes.errorMessage}>{formik.errors.name}</span>
          )}
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "email" ? classes.inputLabelFocused : null
            } ${
              formik.errors.email && formik.touched.email
                ? classes.inputLabelError
                : null
            }`}
          >
            <label htmlFor="email">
              Email{formik.touched.email && formik.errors.email ? "*" : null}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onFocus={() => handleInputFocus("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className={classes.errorMessage}>{formik.errors.email}</span>
          )}
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "phone" ? classes.inputLabelFocused : null
            } ${
              formik.errors.phone && formik.touched.phone
                ? classes.inputLabelError
                : null
            }`}
          >
            <label htmlFor="phone">
              Phone{formik.touched.phone && formik.errors.phone ? "*" : null}
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onFocus={() => handleInputFocus("phone")}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <span className={classes.errorMessage}>{formik.errors.phone}</span>
          )}
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "feedbackType" ? classes.inputLabelFocused : null
            } ${
              formik.errors.feedbackType && formik.touched.feedbackType
                ? classes.inputLabelError
                : null
            } ${classes.customSelect} `}
          >
            <label htmlFor="feedbackType">Feedback Type:</label>
            <select
              id="feedbackType"
              name="feedbackType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.feedbackType}
              onFocus={() => handleInputFocus("feedbackType")}
            >
              <option value="" label="Select a feedback type" />
              <option value={0} label="Recommendation" />
              <option value={1} label="Error Report" />
              <option value={2} label="Question" />
              <option value={3} label="Other" />
            </select>
          </div>
          {formik.touched.feedbackType && formik.errors.feedbackType && (
            <span className={classes.errorMessage}>
              {formik.errors.feedbackType}
            </span>
          )}
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "feedbackTitle"
                ? classes.inputLabelFocused
                : null
            } ${
              formik.errors.feedbackTitle && formik.touched.feedbackTitle
                ? classes.inputLabelError
                : null
            }`}
          >
            <label htmlFor="feedbackTitle">
              Feedback Title{" "}
              {formik.touched.feedbackTitle && formik.errors.feedbackTitle
                ? "*"
                : ""}
            </label>
            <input
              type="text"
              id="feedbackTitle"
              name="feedbackTitle"
              placeholder="Feedback Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.feedbackTitle}
              onFocus={() => handleInputFocus("feedbackTitle")}
            />
          </div>
          {formik.touched.feedbackTitle && formik.errors.feedbackTitle && (
            <span className={classes.errorMessage}>
              {formik.errors.feedbackTitle}
            </span>
          )}
          <div
            className={`${classes.inputLabel} ${
              focusedInput === "feedbackMessage"
                ? classes.inputLabelFocused
                : null
            } ${
              formik.errors.feedbackMessage && formik.touched.feedbackMessage
                ? classes.inputLabelError
                : null
            }`}
          >
            <label htmlFor="feedbackMessage">
              Feedback Message{" "}
              {formik.touched.feedbackMessage && formik.errors.feedbackMessage
                ? "*"
                : ""}
            </label>
            <textarea
              id="feedbackMessage"
              name="feedbackMessage"
              placeholder="Feedback Message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={7}
              value={formik.values.feedbackMessage}
              onFocus={() => handleInputFocus("feedbackMessage")}
            />
          </div>
          {formik.touched.feedbackMessage && formik.errors.feedbackMessage && (
            <span className={classes.errorMessage}>
              {formik.errors.feedbackMessage}
            </span>
          )}
          <button
            className={classes.submitBtn}
            type="submit"
            disabled={
              formik.errors.name ||
              formik.errors.email ||
              formik.errors.feedbackMessage ||
              formik.errors.feedbackTitle ||
              formik.errors.feedbackType ||
              formik.errors.phone ||
              !inputRef.current.value ||
              sendFeedback
                ? true
                : false
            }
          >
            <p>Submit</p>
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Feedback;
