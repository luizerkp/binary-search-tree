const removeDuplicates = (arr) => {
  const uniqueValuesArr = [...new Set(arr)];
  return uniqueValuesArr;
};

export default removeDuplicates;
