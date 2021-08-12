// Doubly linked linked with head and tail

class Node {
  constructor(data, next, prev) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

 
class LinkedList {
  constructor() {
    this.head = undefined;
    this.tail = undefined;
  }

  add(data) {
    if (data === undefined || data === null) {
      return null;
    }

    if (this.head === undefined) {
      this.head = new Node(data);
      return this.tail = this.head;
 
    } else {
      const node = new Node(data);
      this.tail.next = node;
      node.prev = this.tail;
      return this.tail = this.tail.next;
    }
  }

  remove(data) {
    if (data === undefined || data === null) {
      return null;
    }

    let itr = this.head;
    
    while (itr.data !== data && itr.next !== undefined) {
      itr = itr.next;
    }

    if (itr === this.tail && itr.data !== data) {
      return console.log("Data not in list");
    }

    if (itr === this.head) {
      if (this.tail === this.head) {
        return delete this;
  
      } else {
        this.head = this.head.next;
        return delete this.head.prev;
      }
  
    } else if (itr === this.tail) {
      this.tail = this.tail.prev;
      return delete this.tail.next;
  
    } else {
      const node = itr.next;
      itr = itr.prev;
      delete itr.next;
      itr.next = node;
      return node.prev = itr;
    }
  }

  read(direction) {
    if (direction === undefined || direction === null) {
      return null;
    }

    let itr = undefined;
    const answer = [];
    
    if (direction === "forward") {
      itr = list.head;
    } else {
      itr = list.tail;
    }

    while (itr) {
      answer.push(itr.data);
      if (direction === "forward") {
        itr = itr.next;
      } else {
        itr = itr.prev;
      }
    }

    return console.log(answer);
  }
}


const list = new LinkedList;
const integers = [1, 2, 3, 4];
integers.forEach(integer => list.add(integer));

list.read("forward");
list.remove(0);
list.read("forward");