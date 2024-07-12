import React, { useEffect, useState } from "react";
import classes from "../layout/layout.module.css";
import Image from "next/image";
import {
    DialogContent,
    DialogActions,
    Dialog,
    Fade,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});
const StakeholderModal = ({ open, handleClose, openLink, link, data, rtl }) => {
    const { t } = useTranslation();
    const [dialogPadding, setDialogPadding] = useState("30px 50px");


    useEffect(() => {
        const handleResize = () => {
            // Adjust padding based on screen width
            if (window.innerWidth < 600) {
                setDialogPadding("20px 20px"); // Example padding for smaller screens
            } else {
                setDialogPadding("30px 50px"); // Default padding for larger screens
            }
        };

        // Call handleResize initially and add event listener
        handleResize();
        window.addEventListener("resize", handleResize);

        // Remove event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            PaperProps={{
                style: {
                    overflowY: "unset",
                    overflowX: "unset",
                    padding: dialogPadding,
                    direction: rtl ? "rtl" : "",
                },
            }}
            className={'stakeholder-modal ' + classes.dialogStyle}
        >
            <div
                className={classes.closeBtn}
                onClick={() => {
                    handleClose();
                }}
            >
                <Image src="/assets/svg/x.svg" width={19} height={19} alt="x" />
            </div>
            <DialogContent>
                <div className="grid-icon gap-12 pb-12">
                    <img src={data.avatar} width={150} height={150} alt="" />
                    <h2
                        className="op-7"
                        style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
                    >
                        {data.name}
                    </h2>
                    <p
                        className="op-7"
                        style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}
                    >
                        {data.description}
                    </p>
                </div>
            </DialogContent>

            <DialogActions>
                <button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        handleClose();
                        formik.resetForm();
                    }}
                    className={classes.btnCancel}
                    style={{
                        fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                        marginLeft: rtl ? "15px" : "",
                    }}
                >
                    {t("cancel")}
                </button>
                <Link
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="success"
                    className={'py-2 ' + classes.btnSubmit}
                    style={{ fontFamily: rtl ? "DINNext-Arabic-meduim" : "", borderRadius: '0.375em' }}
                >
                    {t("open")}
                </Link>
            </DialogActions>
        </Dialog>
    );
};

export default StakeholderModal;
