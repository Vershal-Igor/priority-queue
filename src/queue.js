"use strict";

const MaxHeap = require('./max-heap.js');

class PriorityQueue {
  constructor(maxSize) {
    this.heap = new MaxHeap();
    this.maxSize = maxSize ? maxSize : 30;
  }

  push(data, priority) {
    if (this.heap.size() < this.maxSize) {
      this.heap.push(data, priority);
    } else {
      throw new Error("Nax size of queue");
    }
  }

  shift() {
    if (!this.heap.isEmpty()) {
      return this.heap.pop();
    } else {
      throw new Error('Queue is empty');
    }
  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;
