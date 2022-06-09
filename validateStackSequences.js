/**
 * Use the given arrays to verify if the stack can be popped in the given order.
 *
 * @input arrays of push order and pop order.
 * @output boolean value on whether the order is valid or not.
 */

// solution - recreate the stack and try to pop the stack with the popped order if possible.
const validateStackSequences = (pushed, popped) => {
  const stack = [];
  for (let num of pushed) {
    stack.push(num);
    while (popped.length > 0 && popped[0] === stack[stack.length - 1]) {
      stack.pop();
      popped.shift();
    }
  }
  return stack.length === 0;
};

const pushedOrder = [1, 2, 3, 4, 5];
const poppedOrder = [4, 5, 3, 2, 1];
const pushedOrder_2 = [1, 2, 3, 4, 5];
const poppedOrder_2 = [4, 3, 5, 1, 2];
console.log(validateStackSequences(pushedOrder, poppedOrder));
console.log(validateStackSequences(pushedOrder_2, poppedOrder_2));
