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
    if (this.head === undefined) {
      this.head = new Node(data);
      this.tail = this.head;
 
    } else {
      const node = new Node(data);
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = this.tail.next;
    }
  }

  remove(data) {
    if (data === undefined || data === null) {
      return null;
    }

    let itr = this.head;
    
    while (itr.data !== data) {
      console.log(itr.data);
      itr = itr.next;
    }

    if (itr === this.head) {
      if (this.tail === this.head) {
        delete this;
  
      } else {
        this.head = this.head.next;
        delete this.head.prev;
      }
  
    } else if (itr === this.tail) {
      this.tail = this.tail.prev;
      delete this.tail.next;
  
    } else {
      const node = itr.next;
      itr = itr.prev;
      delete itr.next;
      itr.next = node;
      node.prev = itr;
    }
  }

  read(direction) {
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

    console.log(answer);
  }
}


const list = new LinkedList;
const integers = [1, 2, 3, 4];
integers.forEach(integer => list.add(integer));

list.read("forward");
list.remove(5);
list.read("forward");