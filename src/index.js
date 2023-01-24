import "./css/normalize.css";
import "material-icons/iconfont/round.css";
import "./css/style.css";
import footer from "./footerContent";
import { Tree } from "./binaryTree";
import { createArrOfRandomInts, addRandomInts } from "./test.banaryTree";

// buildPageContent
(() => {
  const arr = createArrOfRandomInts(20);
  console.log(arr);
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

  // newBST.insertNode(2);
  // newBST.insertNode(-3);
  // newBST.insertNode(-4);
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
  const newBST200More = addRandomInts(newBST, 200);
  console.log(newBST200More);
  // prettyPrint(newBST200More.root);
  // console.log(newBST200More.isBalanced());
  // newBST200More.rebalance();
  // console.log(newBST200More.isBalanced());
  // prettyPrint(newBST200More.root);
  footer.buildFooter();
})();
