import React, { useState } from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Image from "next/image";
import classes from "./treeFilter.module.css";

const MyTreeView = ({
  singleSelectHandling,
  data,
  rtl,
  monitor,
  handleSwitching,
}) => {
  const [selected, setSelected] = useState("");
  const [expanded, setExpanded] = useState([]);
  const [selectMonitor, setSelectMonitor] = useState(false);
  const renderTree = (nodes) => {
    if (!nodes) {
      return null;
    }
    //Checking if the node has a children or not for the treeview
    const hasChildren =
      Array.isArray(nodes.children) && nodes.children.length > 0;
    const hasDataMenus =
      Array.isArray(nodes.dataMenus) && nodes.dataMenus.length > 0;

    const renderDataMenus = (dataMenus) => {
      return dataMenus.map((menu) => {
        const hasMenuChildren =
          Array.isArray(menu.children) && menu.children.length > 0;
        const hasMenuDataMenus =
          Array.isArray(menu.dataMenus) && menu.dataMenus.length > 0;

        return (
          <TreeItem
            key={menu.id}
            nodeId={menu.id}
            label={
              <div
                className={`${classes.parentIcon} ${
                  selected === menu.id ? classes.childSelected : null
                }`}
                onClick={() => {
                  setSelected(menu.id);
                  singleSelectHandling(menu);
                }}
              >
                <p
                  className={`${classes.childrens} ${
                    selected === menu.id ? classes.childSelected : null
                  }`}
                  style={{
                    direction: "ltr",
                    fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                  }}
                >
                  {rtl ? menu.title : menu.titleEN}
                </p>
                <Image
                  src={`/assets/svg/${
                    selected === menu.id ? "pointWhite.svg" : "pointBlack.svg"
                  }`}
                  width={25}
                  height={25}
                  alt="shape"
                />
              </div>
            }
            endIcon={null} // Remove endIcon to avoid showing any icon
            collapseIcon={
              hasMenuChildren || hasMenuDataMenus ? undefined : null
            } // Only show collapse icon if there are children or dataMenus
            expandIcon={hasMenuChildren || hasMenuDataMenus ? undefined : null} // Only show expand icon if there are children or dataMenus
          >
            {hasMenuDataMenus && renderDataMenus(menu.dataMenus)}
          </TreeItem>
        );
      });
    };

    return hasChildren || hasDataMenus ? (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        onClick={() => {
          setSelected(nodes.id);
        }}
        label={
          <div className={classes.parentIcon}>
            <p
              className={`${classes.children}`}
              style={{
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
                color: selected === nodes.id ? "#fff" : "",
              }}
            >
              {rtl ? nodes.title : nodes.titleEN}
            </p>
            <Image
              src={`/assets/svg/${
                selected === nodes.id
                  ? "masterPlanHomeWhite.svg"
                  : "masterPlanHome.svg"
              }`}
              width={25}
              height={25}
              alt="shape"
            />
          </div>
        }
        endIcon={null} // Remove endIcon to avoid showing any icon
        collapseIcon={hasChildren || hasDataMenus ? undefined : null} // Only show collapse icon if there are children or dataMenus
        expandIcon={hasChildren || hasDataMenus ? undefined : null} // Only show expand icon if there are children or dataMenus
      >
        {hasChildren && nodes.children.map((node) => renderTree(node))}
        {hasDataMenus && renderDataMenus(nodes.dataMenus)}
      </TreeItem>
    ) : (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <div
            className={`${classes.parentIcon} `}
            onClick={() => {
              setSelected(nodes.id);
              singleSelectHandling(nodes);
            }}
          >
            <p
              className={`${classes.childrens} ${
                selected === nodes.id ? classes.childSelected : null
              } `}
              style={{
                direction: "ltr",
                fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              }}
            >
              {rtl ? nodes.title : nodes.titleEN}
            </p>
            <Image
              src={`/assets/svg/${
                selected === nodes.id ? "pointWhite.svg" : "pointBlack.svg"
              }`}
              width={25}
              height={25}
              alt="shape"
            />
          </div>
        }
        endIcon={null} // Remove endIcon to avoid showing any icon
        collapseIcon={null} // No collapse icon for nodes without children or dataMenus
        expandIcon={null} // No expand icon for nodes without children or dataMenus
      />
    );
  };

  const handleNodeToggle = (event, nodeIds) => {
    setExpanded(nodeIds);

    // Clear selected if the parent is collapsed
    if (!nodeIds.includes(selected)) {
      setSelected("");
    }
  };

  return (
    <>
      <TreeView
        expanded={expanded}
        onNodeToggle={handleNodeToggle}
        style={{ direction: rtl ? "ltr" : "rtl" }}
        defaultCollapseIcon={
          <Image
            src="/assets/svg/ArrowDown.svg"
            width={20}
            height={20}
            alt="arrowDown"
          />
        }
        defaultExpandIcon={
          <Image
            src="/assets/svg/Chevron.svg"
            width={20}
            height={20}
            alt="chevron"
          />
        }
        className={classes.treeviewMain}
      >
        {data?.map((nodes) => renderTree(nodes))}
      </TreeView>
      {monitor ? (
        <div
          className={`${classes.parentIcon} ${
            selectMonitor ? classes.selectedMonitor : null
          } `}
          style={{
            direction: rtl ? "ltr" : "rtl",
            marginTop: "10px",
            marginLeft: "10px",
          }}
          onClick={() => {
            handleSwitching();
            setSelectMonitor(!selectMonitor);
          }}
        >
          <p
            className={`${classes.childrens} ${classes.childSelected} `}
            style={{
              fontFamily: rtl ? "DINNext-Arabic-meduim " : "",
              color: selectMonitor ? "white" : "black",
            }}
          >
            Implementation Objectives (Monitoring)
          </p>
          <Image
            src={`/assets/svg/${
              selectMonitor ? "pointWhite.svg" : "pointBlack.svg"
            }`}
            width={25}
            height={25}
            alt="shape"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MyTreeView;
