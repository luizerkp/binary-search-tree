// expects the root node as a param
const printToPage = (node, prefix = "", isLeft = true) => {
  if (node.rightNode !== null) {
    printToPage(
      node.rightNode,
      `${prefix}${isLeft ? "│ \xa0\xa0\xa0\xa0\xa0\xa0\xa0" : "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}`,
      false
    );
  }
  const treeDiv = document.querySelector(".tree");
  const div = document.createElement("div");
  div.textContent = `${prefix}${isLeft ? "└── " : "┌── "}${node.data}`;
  treeDiv.appendChild(div);
  if (node.leftNode !== null) {
    printToPage(
      node.leftNode,
      `${prefix}${isLeft ? "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" : "│ \xa0\xa0\xa0\xa0\xa0\xa0\xa0"}`,
      true
    );
  }
};

const consolePrettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.rightNode !== null) {
    consolePrettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    consolePrettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const displayBSTStats = (tree) => {
  const balancedPara = document.querySelector(".balanced");
  balancedPara.textContent = `Balanced: ${tree.isBalanced()}`;

  const heightPara = document.querySelector(".tree-height");
  heightPara.textContent = `Height: ${tree.height()}`;

  const treeRootPara = document.querySelector(".tree-root");
  treeRootPara.textContent = `Tree Root: ${tree.root.data}`;
};

const displayTraversals = (node) => {
  const traversalText = document.querySelector(".traversal-text");
  const currentString = traversalText.textContent;
  const nodeText = traversalText.textContent.length > 0 ? `, ${node.data}` : `${node.data}`;
  traversalText.textContent = currentString.concat(nodeText);
};

export { printToPage, consolePrettyPrint, displayBSTStats, displayTraversals };
