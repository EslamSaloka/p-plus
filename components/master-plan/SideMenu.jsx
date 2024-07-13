import React, { useState, useEffect } from "react";
import classes from "./masterPlan.module.css";
import Image from "next/image";
import MyTreeView from "./TreeView/MyTreeView";
import { filterTree } from "../../utils/filterTreeUitls";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import { FaBars, FaTimes } from "react-icons/fa";

const SideMenu = ({
    singleSelectHandling,
    expanded,
    selected,
    handleToggle,
    handleSelect,
    data,
    rtl,
    monitor,
    handleSwitching,
}) => {
    const { t } = useTranslation();
    const [subjectData, setSubjectData] = useState(data);
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Filter input function
    const onFilterMouseUp = (e) => {
        const value = e.target.value;
        const filter = value.trim();
        if (!filter) {
            setSubjectData(() => data);
            handleToggle("b", []);
            return;
        }
        let filtred = data?.map((data) => {
            const pathed = filterTree(data, filter);
            return pathed.children?.length ? pathed : {};
        });
        let filtredUpdate = filtred.filter((data) => (data.title ? data : null));
        setSubjectData(filtredUpdate);
        handleToggle("b", ["root1", "root2", "root3"]);
    };

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992); // Adjust the breakpoint as needed
        };

        handleResize(); // Check initial width
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile && (
                <IconButton color="info" onClick={toggleSideMenu}>
                    {isSideMenuVisible ? <FaTimes /> : <FaBars />}
                </IconButton>
            )}

            {(!isMobile || isSideMenuVisible) && (
                <div className={'master-side ' + classes.sideMenuMP}>
                    <div className={classes.searchSideMenu}>
                        <Image
                            src="/assets/svg/search-normal.svg"
                            width={24}
                            height={24}
                            alt="search"
                        />
                        <input
                            type="text"
                            placeholder={t("search")}
                            onKeyUp={onFilterMouseUp}
                        />
                    </div>
                    <div className={classes.sideMenuTreeView} data-aos="fade-right">
                        <p>{t("masterplan")}</p>
                        <div className={classes.treeViewSideMenu}>
                            <MyTreeView
                                singleSelectHandling={singleSelectHandling}
                                data={subjectData}
                                expanded={expanded}
                                handleToggle={handleToggle}
                                handleSelect={handleSelect}
                                selectedTree={selected}
                                rtl={rtl}
                                monitor={monitor}
                                handleSwitching={handleSwitching}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideMenu;
