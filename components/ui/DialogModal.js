import React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import classes from "./ui.module.css";

const DialogModal = ({ open, handleClose, openLink, link, data, rtl }) => {
    const { t } = useTranslation();

    if (open && data) {
        Swal.fire({
            icon: data.avatar ? null : "warning",
            imageUrl: data.avatar || null,
            imageWidth: 150 || null,
            imageHeight: 150 || null,
            imageAlt: 'modal icon' || null,
            title: data.name || t("alert-header"),
            text: (rtl ? data.description : data.descriptionEN) || t("alert-message"),
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#d33",
            confirmButtonText: t("confirm"),
            cancelButtonText: t("cancel"),
            customClass: {
                container: classes.customTitleAlert,
                title: classes.customTitleAlert,
                content: classes.customTitleAlert,
                confirmButton: classes.customTitleAlert,
                cancelButton: classes.customTitleAlert,
            },
        }).then((result) => {
            if (result.isConfirmed) {
                openLink(link);
            } else {
                handleClose();
            }
        });
    }

    return null;
};

export default DialogModal;
