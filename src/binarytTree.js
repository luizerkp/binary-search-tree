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
