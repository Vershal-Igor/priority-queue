"use strict"

const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize ? maxSize : 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {

	}

	shift() {
		return this.heap.pop();
	}

	size() {

	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;