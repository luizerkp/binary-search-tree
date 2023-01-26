import "./css/normalize.css";
import "material-icons/iconfont/round.css";
import "./css/style.css";
import footer from "./footerContent";
import { Tree } from "./binaryTree";
import { createArrOfRandomInts, addRandomInts } from "./test.banaryTree";
import { printToPage, consolePrettyPrint, displayBSTStats, displayTraversals } from "./displayBST";

const BSTDisplay = (() => {
  let BST;
  const checkInputValidity = (input) => {
    const validityState = input.validity;
    const errMsg =
      input.id === "random-array" ? "Please enter an interger between 1 and 100" : "Please enter a valid number";
    if (!validityState.valid) {
      input.setCustomValidity(errMsg);
    } else {
      input.setCustomValidity("");
    }

    input.reportValidity();
  };

  const clearTreeInfo = () => {
    const treeDiv = document.querySelector(".tree");
    const treeInfoStats = document.querySelector(".tree-info-stats");

    if (treeDiv.hasChildNodes()) {
      treeDiv.replaceChildren();
    }
    if (treeInfoStats.hasChildNodes()) {
      treeInfoStats.replaceChildren();
    }
  };

  const clearTraversalText = () => {
    const traversalText = document.querySelector(".traversal-text");
    if (traversalText.textContent.length > 0) {
      traversalText.textContent = "";
    }
  };

  const checkBSTTooLarge = () => BST.inOrder().length > 225;

  const displayBSTInfo = () => {
    clearTraversalText();
    clearTreeInfo();
    consolePrettyPrint(BST.root);
    displayBSTStats(BST);
    printToPage(BST.root);
  };

  const initialLoadOut = () => {
    const arr = createArrOfRandomInts(25);
    BST = new Tree(arr);
    displayBSTInfo();
  };

  const rebalanceCurrentBST = () => {
    if (!BST.isBalanced()) {
      BST.rebalance();
      displayBSTInfo();
    }
  };

  const unbalanceCurrentBST = () => {
    if (checkBSTTooLarge) {
      const randomArrayInputField = document.querySelector("#random-array");
      randomArrayInputField.value = 100;
      alert("Binary Tree is too large to display generated a new max size(100) array to unbanlance");
      const arr = createArrOfRandomInts(100);
      BST = new Tree(arr);
    }

    if (BST.isBalanced()) {
      addRandomInts(BST, 125);
      displayBSTInfo();
    }
  };

  const generateNewTree = (input) => {
    if (!input.validity.valid) {
      return checkInputValidity(input);
    }

    const arr = createArrOfRandomInts(parseInt(input.value, 10));
    console.log(arr);
    BST = new Tree(arr);
    return displayBSTInfo();
  };

  const getBST = () => BST;

  return {
    initialLoadOut,
    getBST,
    clearTraversalText,
    rebalanceCurrentBST,
    generateNewTree,
    unbalanceCurrentBST,
  };
})();

// Add event listeners
const eventListeners = (() => {
  const addTreeBalanceBtnsListener = () => {
    const balanceBtns = document.querySelectorAll(".balance-btns");
    balanceBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        switch (e.target.value) {
          case "unbalance":
            BSTDisplay.unbalanceCurrentBST();
            break;
          case "rebalance":
            BSTDisplay.rebalanceCurrentBST();
            break;
          default:
            break;
        }
      });
    });
  };

  const addTreeFunctionsEventListeners = () => {
    const treeFunctionBtns = document.querySelectorAll(".tree-function-btns");
    const treeFunctionteInputValues = {
      generate: document.querySelector("#random-array"),
      insert: document.querySelector("#insert-into"),
      remove: document.querySelector("#remove-from"),
      find: document.querySelector("#find-depth"),
    };

    treeFunctionBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        switch (e.target.value) {
          case "generate":
            BSTDisplay.generateNewTree(treeFunctionteInputValues.generate);
            break;
          default:
            break;
        }
      });
    });
  };

  const addTraversalBtnsListeners = () => {
    const traversalBtns = document.querySelectorAll(".traversal-btns");

    traversalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const currentBST = BSTDisplay.getBST();

        BSTDisplay.clearTraversalText();

        switch (e.target.value) {
          case "levelOrder":
            currentBST.levelOrder(displayTraversals);
            break;
          case "inOrder":
            currentBST.inOrder(displayTraversals);
            break;
          case "preOrder":
            currentBST.preOrder(displayTraversals);
            break;
          case "postOrder":
            currentBST.postOrder(displayTraversals);
            break;
          default:
            break;
        }
      });
    });
  };

  return {
    addTraversalBtnsListeners,
    addTreeBalanceBtnsListener,
    addTreeFunctionsEventListeners,
  };
})();

// buildPageContent
(() => {
  BSTDisplay.initialLoadOut();
  eventListeners.addTreeFunctionsEventListeners();
  eventListeners.addTreeBalanceBtnsListener();
  eventListeners.addTraversalBtnsListeners();
  footer.buildFooter();
})();
