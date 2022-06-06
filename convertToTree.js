/**
 * Convert given array into a tree structure.
 *
 * @date 06/05/2022
 * @input array of tree like nodes.
 * @output array content in a tree like object.
 */
const array = [
  {
    self: "0",
  },
  {
    parent: "0",
    self: "a",
  },
  {
    parent: "0",
    self: "b",
  },
  {
    parent: "a",
    self: "m",
  },
  {
    parent: "a",
    self: "n",
  },
  {
    parent: "b",
    self: "p",
  },
  {
    parent: "b",
    self: "q",
  },
];

// solution - recursion to fill in all the information on each node.
const makeTree = (array) => {
  const root = { self: array[0].self };

  const addChildren = (array, root) => {
    const children = array.filter((node) => node.parent === root.self);
    root["children"] = children;
    if (children.length > 0) {
      for (let child of children) {
        addChildren(array, child);
      }
    }
  };

  addChildren(array, root);
  return root;
};

console.log(makeTree(array));
