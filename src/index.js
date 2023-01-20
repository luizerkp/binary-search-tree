import "./css/normalize.css";
import "material-icons/iconfont/round.css";
import "./css/style.css";
import footer from "./footerContent";
import { Tree } from "./binaryTree";

// buildPageContent
(() => {
  const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  // const arr = [];
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
  newBST.insertNode(-1);
  // newBST.deleteNode(4);
  prettyPrint(newBST.root);
  // console.log(newBST.find(99));
  // newBST.levelOrder(console.log);
  console.log(newBST.levelOrder());
  // newBST.inOrder(console.log);
  console.log(newBST.inOrder());
  // newBST.preOrder(console.log);
  console.log(newBST.preOrder());
  // newBST.postOrder(console.log);
  console.log(newBST.postOrder());
  console.log(newBST.height());
  console.log(newBST.isBalanced());
  footer.buildFooter();
})();
