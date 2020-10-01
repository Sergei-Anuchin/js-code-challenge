// Problem 1 C
// Task: Provide 3 unique implementations of the following function.
// Input: `n` - any integer from `0` to `Number.MAX_SAFE_INTEGER`.
// Output: `return` - summation to `n`, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.

const bigIntZero = BigInt(0);
const bigIntOne = BigInt(1);

const decorate = (fn) => (...args) => {
  let result = fn.apply(null, args);
  while (typeof result === 'function') {
    result = result();
  }

  return result;
};

const recursiveSum = (n, sum = BigInt(0)) => {
  const bigIntN = BigInt(n);
  return bigIntN === bigIntZero ? sum : () => recursiveSum(bigIntN - bigIntOne, sum + bigIntN);
};

const sum_to_n = function(n) {
  return decorate(recursiveSum)(n);
};

console.log(String(sum_to_n(/*Number.MAX_SAFE_INTEGER*/ 10040)));