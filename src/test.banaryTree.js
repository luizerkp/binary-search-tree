const generateRandomInt = () => {
  const min = 0;
  const max = 1000;
  return Math.floor(Math.random() * (max - min) + min);
};

export const createArrOfRandomInts = (size) => {
  console.log(`Size: ${size}`);
  return Array(size).fill().map(generateRandomInt);
};

export const addRandomInts = (byanarySearchTree, randomNumsSize) => {
  const arr = createArrOfRandomInts(randomNumsSize);

  arr.forEach((value) => {
    byanarySearchTree.insertNode(value);
  });

  return byanarySearchTree;
};
