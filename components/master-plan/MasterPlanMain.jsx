import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import MasterPlan from "./MasterPlan";
import classes from "./masterPlan.module.css";
import Footer from "../footer/footer";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import findNodeAndParentsByName from "@/utils/findNodeAndParent";
import { findNodeAndParentsById } from "@/utils/findNodeAndParent";
import { useRouter } from "next/router";
import Subscribe from "../ui/Subscribe";

const MasterPlanMain = ({
  plan,
  rtl,
  data,
  elementSelect,
  conVersion,
  pptUrl,
  videourl,
  monitor,
}) => {
  const router = useRouter();
  console.log(monitor);
  const [selectingElem, setSelectingElem] = useState([elementSelect]);
  const [switching, setSwitching] = useState(false);
  const [singleElemSelecting, setSingleElemSelecting] = useState(elementSelect);
  const [selected, setSelected] = useState([]);
  const [singleSelectingDesc, setSignelDesc] = useState("");
  const [expanded, setExpanded] = useState([`root${1}`]);
  const { t } = useTranslation();
  const handleSelectSingleElem = (elem, idSelect) => {
    setSingleElemSelecting(elem);
    setSignelDesc(elem.description);
  };
  //handling switching between table and pdf
  const handleSwitching = () => {
    setSwitching(!switching);
  };
  // useEffect(() => {
  //   if (select && select.length > 0) {
  //     const result = findNodeAndParentsByName(data, select);

  //     if (result.length > 0 && result[0].description) {
  //       setSelectingElem(() => [result[0].path[0], result[0].title]);
  //       handleSelectSingleElem(result[0], result[0].id);
  //     }
  //   }
  // }, []);
  // useEffect(() => {
  //   const result = findNodeAndParentsByName(data, singleElemSelecting);

  //   if (result.length > 0) {
  //     setSelectingElem(() => [result[0].path[0], result[0].title]);
  //     router.push(
  //       {
  //         pathname: router.pathname,
  //         query: { plan: result[0].masterPlanId, select: result[0].title },
  //       },
  //       undefined,
  //       { shallow: true }
  //     );
  //   }
  // }, [singleElemSelecting]);

  //  Toggling to specifc plan

  const handleToggle = (event, nodeIds) => {
    let expandedTemp = expanded;

    expandedTemp = nodeIds;

    setExpanded(expandedTemp);
  };

  const handleSelect = async (event, nodeIds) => {};

  return (
    <>
      <div className={classes.masterPlanMain}>
        <div className={classes.choosen}>
          <p>
            <span
              onClick={() => {
                router.push("/");
              }}
            >
              {t("home-route")}
            </span>
            <Image
              src="/assets/svg/Chevron.svg"
              width={16}
              height={16}
              alt="chevron"
              style={{ transform: rtl ? "rotate(180deg)" : "" }}
            />
            <span
              onClick={() => {
                router.push("/#masterplan");
              }}
            >
              {t("masterplan")}
            </span>
            {selectingElem.length ? (
              <>
                {" "}
                <Image
                  src="/assets/svg/Chevron.svg"
                  width={16}
                  height={16}
                  alt="chevron"
                  style={{ transform: rtl ? "rotate(180deg)" : "" }}
                />
                <span>{rtl ? data[0].title : data[0].titleEN}</span>{" "}
                <Image
                  src="/assets/svg/Chevron.svg"
                  width={16}
                  height={16}
                  alt="chevron"
                  style={{ transform: rtl ? "rotate(180deg)" : "" }}
                />
                <span>
                  {rtl
                    ? singleElemSelecting.title
                    : singleElemSelecting.titleEN}
                </span>
              </>
            ) : null}
          </p>
        </div>
        <div className={classes.masterPlanContent}>
          <SideMenu
            singleSelectHandling={handleSelectSingleElem}
            expanded={expanded}
            selected={selected}
            handleToggle={handleToggle}
            handleSelect={handleSelect}
            data={data}
            rtl={rtl}
            monitor={monitor}
            handleSwitching={handleSwitching}
          />
          <MasterPlan
            singleDesc={singleSelectingDesc}
            singleElem={singleElemSelecting}
            pptFile={pptUrl}
            videoUrl={videourl}
            rtl={rtl}
            switching={switching}
            monitor={monitor}
          />
        </div>
      </div>
      <Subscribe rtl={rtl} />
      <Footer conVersion={conVersion} />
    </>
  );
};

export default MasterPlanMain;
