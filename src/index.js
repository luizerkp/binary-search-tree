import "./css/normalize.css";
import "material-icons/iconfont/round.css";
import "./css/style.css";
import footer from "./footerContent";
import { Tree } from "./binarytTree";

// buildPageContent
(() => {
  const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const newBST = new Tree(arr);
  // console.log(newBST);
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    // console.log(node);
    if (node.rightNode !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  newBST.insertNode(2);
  newBST.insertNode(0);
  // newBST.deleteNode(1);
  // newBST.deleteNode(0);
  console.log(newBST);
  prettyPrint(newBST.root);
  footer.buildFooter();
})();
