import React, { useState } from "react";
import { Treebeard } from "react-treebeard";

const TreeView = ({ dataa }) => {
  const [data, setData] = useState(dataa);
  const [cursor, setCursor] = useState(false);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(Object.assign({}, data));
  };

  return <Treebeard data={data} onToggle={onToggle} />;
};

export default TreeView;
