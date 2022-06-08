/**
 * Implement a minStack with all methods runs in constant time.
 *
 * @date 06/08/2022
 *
 * Solution approach: in order to achieve constant run time,
 * we need to store the min val at each node (mostly for getMin method).
 */

/**
 * Constructor of the minStack.
 */
const MinStack = function () {
  this.stack = [];
};

/**
 * push method, push the incoming value into the stack.
 *
 * @input the value to be push into the stack.
 */
MinStack.prototype.push = function (val) {
  if (this.stack.length === 0) {
    this.stack.push({ val, minVal: val });
  } else {
    const prevMinVal = this.stack[this.stack.length - 1].minVal;
    if (prevMinVal > val) {
      this.stack.push({ val, minVal: val });
    } else {
      this.stack.push({ val, minVal: prevMinVal });
    }
  }
};

/**
 * pop method, remove the top element in the stack.
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
};

/**
 * top method, silimar to peek.
 *
 * @output the top value currently on the stack.
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1].val;
};

/**
 * getMin method.
 *
 * @output the minimum value currently in the stack.
 */
MinStack.prototype.getMin = function () {
  return this.stack[this.stack.length - 1].minVal;
};

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack);
console.log(minStack.getMin()); // return -3
minStack.pop();
console.log(minStack.top()); // return 0
console.log(minStack.getMin()); // return -2
