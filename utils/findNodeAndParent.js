const findNodeAndParentsByName = (tree, targetName) => {
  const result = [];

  const traverse = (node, path) => {
    if (node.title === targetName) {
      // Found the target node, add it to the result along with its path
      result.push({ ...node, path });
    }

    if (node.children) {
      // Recursively traverse child nodes
      for (const child of node.children) {
        traverse(child, [...path, node.title]);
      }
    }
  };

  // Start the traversal from the root of the tree
  for (const node of tree) {
    traverse(node, []);
  }

  return result;
};
export default findNodeAndParentsByName;
export const findNodeAndParentsById = (tree, targetName) => {
  const result = [];

  const traverse = (node, path) => {
    if (node.title === targetName) {
      // Found the target node, add it to the result along with its path
      result.push({ ...node, path });
    }

    if (node.children) {
      // Recursively traverse child nodes
      for (const child of node.children) {
        traverse(child, [...path, node.id]);
      }
    }
  };

  // Start the traversal from the root of the tree
  for (const node of tree) {
    traverse(node, []);
  }

  return result;
};
