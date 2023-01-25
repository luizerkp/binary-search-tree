import "./css/normalize.css";
import "material-icons/iconfont/round.css";
import "./css/style.css";
import footer from "./footerContent";
import { Tree } from "./binaryTree";
import { createArrOfRandomInts, addRandomInts } from "./test.banaryTree";
import { printToPage, consolePrettyPrint, displayBSTStats, displayTraversals } from "./displayBST";

const BSTDisplay = (() => {
  let arr;
  let BST;

  const initialLoadOut = () => {
    arr = createArrOfRandomInts(20);
    BST = new Tree(arr);
    addRandomInts(BST, 5);
    consolePrettyPrint(BST.root);
    displayBSTStats(BST);
    printToPage(BST.root);
  };

  const getBST = () => BST;

  return {
    initialLoadOut,
    getBST,
  };
})();

// Add event listeners
const eventListeners = (() => {
  const addTraversalBtnsListeners = () => {
    const traversalBtns = document.querySelectorAll(".traversal-btns");
    const traversalText = document.querySelector(".traversal-text");
    const currentBST = BSTDisplay.getBST();

    traversalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e);
        if (e.target.value === "levelOrder") {
          if (traversalText.textContent.length > 0) {
            traversalText.textContent = "";
          }
          currentBST.levelOrder(displayTraversals);
        }
      });
    });
  };

  return {
    addTraversalBtnsListeners,
  };
})();

// buildPageContent
(() => {
  BSTDisplay.initialLoadOut();
  eventListeners.addTraversalBtnsListeners();
  footer.buildFooter();
})();
