/**
 * Divide  : Divide array into two sub-arrays
 * Conquer : Sort the two sub-arrays recursively using merge sort
 * Combine : Merge the two sub-arrays into a sorted array
 * */

// merge both sub-arrays
const merge = (leftSubArray, rightSubArray) => {
  const leftSubArrayLength = leftSubArray.length;
  const rightSubArrayLength = rightSubArray.length;
  const mergedArray = [];

  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < leftSubArrayLength && rightIdx < rightSubArrayLength) {
    // ***NOTE: for descending order change comparison to '>='
    if (leftSubArray[leftIdx] < rightSubArray[rightIdx]) {
      mergedArray.push(leftSubArray[leftIdx]);
      leftIdx += 1;
    } else {
      mergedArray.push(rightSubArray[rightIdx]);
      rightIdx += 1;
    }
  }

  const leftRemainder = leftSubArray.slice(leftIdx);
  const rightRemainder = rightSubArray.slice(rightIdx);

  return [...mergedArray, ...leftRemainder, ...rightRemainder];
};

// recusive call mergeSort
const mergeSort = (arr) => {
  if (!Array.isArray(arr)) {
    return `mergeSort error: parameter must be an Array found ${typeof arr}`;
  }

  if (arr.length <= 1) {
    return arr;
  }

  // find array mid point
  const mid = Math.floor(arr.length / 2);

  const leftSubArray = arr.slice(0, mid);
  const rightSubArray = arr.slice(mid, arr.length);

  // Combine
  return merge(mergeSort(leftSubArray), mergeSort(rightSubArray));
};

export default mergeSort;
