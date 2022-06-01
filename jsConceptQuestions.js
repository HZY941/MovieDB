/**
 * Java Script Interview Questions ----------------
 *
 * @date 05/31/2022
 * @topics
 *  Some object / function assignment
 *  This keyword
 *  Hoisting
 */

// ----------------
// function / object assignment
const n = 100;

function foo(n) {
  console.log(n);
}

foo(n);
const a = foo(n);
console.log("Q1: ----------");
console.log(a);
/**
 * Q1 Answer:
 * a is undefined because func(n) will not return anything
 */

const b = new foo(n);
console.log("Q2: ----------");
console.log(b);
/**
 * Answer:
 * b is a function object since new func(n) will return an new obj
 */

var val = "yo";

const baz = {
  val: 42,
  func: () => console.log(this.val),
  func2: function () {
    console.log(this.val);
  },
};

console.log("Q3-1: ----------");
baz.func();
/**
 * Answer:
 * since arrow function doesn't have this reference, it will point to
 * global window obj, which will give back 'yo'
 */

console.log("Q3-2: ----------");
baz.func2();
/**
 * Answer:
 * in this case, this keyword will refer to the instance of this obj,
 * which this.val will refer to current val, 42
 */

var m = 10;

function funcLogM() {
  let m = 20;
  console.log(this);
  console.log(this.m);
}

console.log("Q4 ----------");
// funcLogM();
/**
 * Answer:
 * this inside a plain function will refer to the global window obj
 * this.m will refer to 10
 */

console.log("Q5 ----------");

/*
// original code provided
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("i = ", i);
  }, 1000);
}

// use let
for (let j = 0; j < 5; j++) {
  setTimeout(() => {
    console.log("j = ", j);
  }, 1000);
}

// use IIFE
for (var k = 0; k < 5; k++) {
  setTimeout(
    (() => {
      console.log("k = ", k);
    })(k),
    1000
  );
}

*/

/**
 * Answer:
 * since var is a function scoped variable, var will be shared with all the console.log within the loop, by the time for the first console.log, i would have become 5, thus prints out all 5's.
 *
 * Fix - 1: make the var to let, to make the variable to be a blocked scoped variable.
 *
 * Fix - 2: use IIFE,
 */
