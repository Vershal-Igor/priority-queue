"use strict"

const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize ? maxSize : 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() < this.maxSize) {
			this.heap.push(data, priority);
		} else {
			throw new Error("Node isn't a child of this node");
		}
	}

	shift() {
		if ( this.heap.isEmpty() )
			throw "Queue's empty!";
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
