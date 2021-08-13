/*               Iterative tree traversals

Works cited
  1.Algorithms
      1.1. Pre order: https://leetcode.com/problems/binary-tree-preorder-traversal/discuss/177117/Simple-Iterative-Javascript-Solution
      1.2. In order: https://medium.com/@amyhuajs/the-iterative-solution-to-inorder-tree-traversal-easily-explained-f25f09e5435b
      1.3. Post order: https://medium.com/@sabahat.usman.su/iterative-postorder-traversal-of-a-binary-tree-9f7f397de767    */


class StackNode {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(data) {
    if (!this.head) {
      this.head = new StackNode(data);
      this.tail = this.head;
    } else {
      const node = new StackNode(data);
      node.next = this.tail;
      this.tail = node;
    }
  }

  pop() {
    let node;
    if (!this.head) return null;
    else if (this.head === this.tail) {
      node = this.head;
      this.head = null;
      this.tail = null;
      const data = node.data;
      node = null;
      return data;
    } else {
      node = this.tail;
      this.tail = this.tail.next;
      const data = node.data;
      node = null;
      return data;
    }
  }
}


class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.visited = false;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(data) {
    if (!data) throw "No data to put in tree";

    let node = this.root;
    if (!node) this.root = new Node(data);
    else {
      while (true) {
        if (data === node.data) throw "Data already in tree";
        else if (data < node.data) {
          if (node.left) node = node.left;
          else {
            node.left = new Node(data);
            break;
          }

        } else if (data > node.data) {
          if (node.right) node = node.right;
          else {
            node.right = new Node(data);
            break;
          }
        }
      }
    }
  }

  remove(data) {
    let fast = this.root;
    let slow = this.root;

    if (!data || !this.root) throw "error";
    else if ( data === this.root.data &&
            ( !this.root.left && !this.root.right)) {
                this.root = null;
    } else {
      while (data != fast.data) {
        if (data < fast.data) {
          slow = fast;
          fast = fast.left;
        } else {
          slow = fast;
          fast = fast.right;
        }
      }
      this.remove_(fast, slow);
    }
  }

  remove_(fast, slow) {
    if (fast === this.root) {
      if (!fast.right) this.root = fast.left;
      else {
        let node = fast.right;
        let itr = fast.right;

        if (!itr.left) {
          if (!fast.left) {
            this.root = itr;
            fast = null;
          } else {
            fast.data = itr.data;
            fast.right = itr.right;
          }

        } else {
          while (itr.left) {
            node = itr;
            itr = itr.left;
          }

          fast.data = itr.data;
          if (itr.right) node.left = itr.right;
          else node.left = null;
        }
      }

    } else if (!fast.left && !fast.right) {
      if (slow.left === fast) slow.left = null;
      else slow.right = null;

    } else if (!fast.left && fast.right.data > slow.data) {
      slow.right = fast.right;

    } else if (!fast.left) slow.left = fast.right;

    else if (!fast.right) slow.right = fast.left;

    else {
      let node = fast.right;

      if (node.left === null && node.right === null) {
        fast.data = node.data;
        fast.right = null;

      } else if (node.left === null && node.right) {
        node.left = fast.left;
        slow.right = node;

      } else {
        let itr = node.left;
        while (itr.left) {
          node = itr;
          itr = itr.left;
        }

        fast.data = itr.data;
        node.left = null;
      }
    }
  }

  preOrder() {
    if (!this.root) throw "No tree root";
    const result = [];
    const stack = new Stack;
    stack.push(this.root);

    while (stack.head) {
      const node = stack.pop();
      result.push(" " + node.data);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }

    return result;
  }

  inOrder() {
    if (!this.root) throw "No tree root";
    const result = [];
    const stack = new Stack;
    let fast = this.root;

    while (true) {
      while (fast) {
        stack.push(fast);
        fast = fast.left;
      }

      if (!stack.head) break;
      else {
        const slow = stack.pop();
        result.push(" " + slow.data);
        fast = slow.right;
      }
    }

    return result;
  }

  postOrder() {
    if (!this.root) throw "No tree root";
    const result = [];
    const stack = new Stack;
    let fast = this.root;
    let slow = this.root;

    while (fast) {
      while (fast.left) {
        stack.push(fast);
        fast = fast.left;
      }

      while (!fast.right || fast.right === slow) {
        result.push(" " + fast.data);
        slow = fast;
        if (!stack.head) return result;
        fast = stack.pop();
      }

      stack.push(fast);
      fast = fast.right;
    }

    return result;
  }

  minMaxDepths() {
    if (!this.root) return null;
    else if (!this.root.left && !this.root.right) {
      return "Min 1, max 1";
    }

    let itr = this.root;
    let count = 1;
    const branches = new Stack;
    let min = Infinity;
    let max = 1;

    while (true) {
      if (itr.left && itr.right && itr.visited === false) {
        branches.push([count, itr]);
      }

      if (itr.visited === true) {
        count++;
        itr = itr.right;

      } else if (itr.left) {
        count++;
        itr.visited = true;
        itr = itr.left;

      } else if (itr.right) {
        count++;
        itr = itr.right;

      } else {
        if (count < min) min = count;
        if (count > max) max = count;

        if (!branches.head) break;
        else {
          const sub = branches.pop();
          count = sub[0];
          itr = sub[1];
        }
      }
    }

    return "Min " + min + ", " + "max " + max;
  }
}

/*
              100
        20         150
          80     120   200
                     170    210
                  160                   */

const tree = new Tree;
const integers = [100, 20, 80, 150, 120, 200, 170, 160, 210];
integers.forEach(integer => tree.add(integer));

console.log(tree.minMaxDepths());



/* Example tree with algorithms

                                  10
                                /   \
                               5     15
                                    /   \
                                  12     20
Searches
1. Order
    1. Depth: orders
          A. Pre
          B. In
          C. Post
    2. Breadth
          A. Level order

2. Method
  1. Iteration

    A. Pre with stack
      1. Push root to stack
      2. While stack
        A. Pop stack for vertex
        B. Save data to answer
        C. Push right and left to stack
      3. Return answer
    
    B. In with stack
      1. Set fast to root
      2. While true
        A. While fast
          1. Push fast to stack
          2. Set fast to fast left
        B. Break if stack is empty 
        C. Set slow to stack pop and 
            save data to answer
        D. Set fast to slow right
      3. Return answer
    
    C. Post with stack
      1. Set fast and slow to root
      2. While fast
        A. While fast left
          1. Push fast to stack
          2. Set fast to fast left
        B. While fast right is slow or null
          1. Save fast data to answer
          2. Set slow to fast
          3. Return if stack empty
          4. Set fast to stack pop
        C. Push fast to stack
        D. Set fast to fast right
      3. Return answer
    
    D. Level with queue 
      1. Push root to q
      2. While q length
        A. Shift q for vertex
        B. Save vertex data to answer
        C. Push vertex left if left
        D. Push vertex right if right
      3. Return answer

  2. Recursion
    1. Pre: save data to answer; left; right
    2. In:  left; save data to answer; right
    3. Post: left; right; save data to answer



*/