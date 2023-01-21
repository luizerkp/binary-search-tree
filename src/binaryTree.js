import mergeSort from "./mergeSort";
import removeDuplicates from "./removeDuplicates";
import Node from "./nodeClass";

const buildTree = (arr) => {
  const uniqueValuesArr = removeDuplicates(arr);
  const sortedArr = mergeSort(uniqueValuesArr);
  const sortedArrToBST = (start, end) => {
    if (start > end) {
      return null;
    }
    const mid = start + Math.floor((end - start) / 2);
    const newNode = new Node(sortedArr[mid]);
    newNode.leftNode = sortedArrToBST(start, mid - 1);
    newNode.rightNode = sortedArrToBST(mid + 1, end);

    return newNode;
  };
  const root = sortedArrToBST(0, sortedArr.length - 1);
  return root;
};

export class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }

  insertNode(value, currentNode = this.root) {
    if (currentNode === null) {
      return new Node(value);
    }
    if (currentNode.data === value) {
      return currentNode;
    }
    if (value < currentNode.data) {
      currentNode.leftNode = this.insertNode(value, currentNode.leftNode);
    }
    if (value > currentNode.data) {
      currentNode.rightNode = this.insertNode(value, currentNode.rightNode);
    }
    return currentNode;
  }

  deleteNode(value, currentNode = this.root) {
    if (currentNode === null) {
      return currentNode;
    }

    if (currentNode.data === value) {
      if (currentNode.leftNode === null) {
        return currentNode.rightNode;
      }
      if (currentNode.rightNode === null) {
        return currentNode.leftNode;
      }
      // find smallest value node on the right subtree (inorder sucessor) and assign it to the current node
      currentNode.data = this.#findMinValue(currentNode.rightNode);
      // delete the inorder sucessor
      currentNode.rightNode = this.deleteNode(currentNode.data, currentNode.rightNode);
    } else {
      if (value < currentNode.data) {
        currentNode.leftNode = this.deleteNode(value, currentNode.leftNode);
      }

      if (value > currentNode.data) {
        currentNode.rightNode = this.deleteNode(value, currentNode.rightNode);
      }
    }

    return currentNode;
  }

  find(value, currentNode = this.root) {
    if (currentNode !== null && currentNode.data !== value) {
      if (value < currentNode.data) {
        return this.find(value, currentNode.leftNode);
      }

      if (value > currentNode.data) {
        return this.find(value, currentNode.rightNode);
      }
    }

    return currentNode === null ? "Not Found" : currentNode;
  }

  levelOrder(callBack) {
    const levelOrderNodeList = [];

    const levelOrderRecursive = (currentQueue) => {
      if (currentQueue.length === 0) {
        return;
      }

      const currentNode = currentQueue.shift();

      if (callBack) {
        callBack(currentNode);
      } else {
        levelOrderNodeList.push(currentNode.data);
      }

      if (currentNode.leftNode) {
        currentQueue.push(currentNode.leftNode);
      }
      if (currentNode.rightNode) {
        currentQueue.push(currentNode.rightNode);
      }

      levelOrderRecursive(currentQueue);
    };

    // const levelOrderIterative = (currentQueue) => {
    //   while (currentQueue.length !== 0) {
    //     const currentNode = currentQueue.shift();

    //     if (callBack) {
    //       callBack(currentNode);
    //     } else {
    //       levelOrderNodeList.push(currentNode.data);
    //     }

    //     if (currentNode.leftNode) {
    //       currentQueue.push(currentNode.leftNode);
    //     }
    //     if (currentNode.rightNode) {
    //       currentQueue.push(currentNode.rightNode);
    //     }
    //   }
    // };

    if (this.root !== null) {
      levelOrderRecursive([this.root]);
      // levelOrderIterative([this.root]);
    }

    return levelOrderNodeList.length > 0 ? levelOrderNodeList : null;
  }

  inOrder(callBack) {
    const inOrderNodeList = [];

    const inOrderRecursive = (currentNode) => {
      if (currentNode === null) {
        return;
      }

      inOrderRecursive(currentNode.leftNode);

      if (callBack) {
        callBack(currentNode);
      } else {
        inOrderNodeList.push(currentNode.data);
      }

      inOrderRecursive(currentNode.rightNode);
    };

    if (this.root !== null) {
      inOrderRecursive(this.root);
    }

    return inOrderNodeList.length > 0 ? inOrderNodeList : null;
  }

  preOrder(callBack) {
    const preOrderNodeList = [];

    const preOrderRecursive = (currentNode) => {
      if (currentNode === null) {
        return;
      }

      if (callBack) {
        callBack(currentNode);
      } else {
        preOrderNodeList.push(currentNode.data);
      }

      preOrderRecursive(currentNode.leftNode);
      preOrderRecursive(currentNode.rightNode);
    };

    if (this.root !== null) {
      preOrderRecursive(this.root);
    }

    return preOrderNodeList.length > 0 ? preOrderNodeList : null;
  }

  postOrder(callBack) {
    const postOrderNodeList = [];

    const postOrderRecursive = (currentNode) => {
      if (currentNode === null) {
        return;
      }

      postOrderRecursive(currentNode.leftNode);
      postOrderRecursive(currentNode.rightNode);

      if (callBack) {
        callBack(currentNode);
      } else {
        postOrderNodeList.push(currentNode.data);
      }
    };

    if (this.root !== null) {
      postOrderRecursive(this.root);
    }

    return postOrderNodeList.length > 0 ? postOrderNodeList : null;
  }

  height(currentNode = this.root) {
    if (currentNode === null) {
      return -1;
    }
    const leftHeight = this.height(currentNode.leftNode);
    const rightHeight = this.height(currentNode.rightNode);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, currentNode = this.root, edges = 0) {
    if (currentNode === null) {
      return null;
    }
    if (currentNode.data === node.data) {
      return edges;
    }
    if (node.data < currentNode.data) {
      const newEdges = edges + 1;
      return this.depth(node, currentNode.leftNode, newEdges);
    }
    if (node.data > currentNode.data) {
      const newEdges = edges + 1;
      return this.depth(node, currentNode.rightNode, newEdges);
    }
    return edges;
  }

  isBalanced() {
    return this.#isBalancedHelper() > 0;
  }

  rebalance() {
    const inOrderNodeList = this.inOrder();
    this.root = buildTree(inOrderNodeList);
    return this.root;
  }

  #isBalancedHelper(currentNode = this.root) {
    if (currentNode === null) {
      return 0;
    }
    const leftHeight = this.#isBalancedHelper(currentNode.leftNode);
    const rightHeight = this.#isBalancedHelper(currentNode.rightNode);

    if (leftHeight === -1) {
      return -1;
    }

    if (rightHeight === -1) {
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  #findMinValue(node) {
    let min = node.data;
    let ptr = node;
    while (ptr.leftNode !== null) {
      min = ptr.leftNode.data;
      ptr = ptr.leftNode;
    }
    return min;
  }
}

export default Tree;
