"use strict"
class Node {
  constructor(data, priority) {
	this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;

	}

  appendChild(node) {
	if (!this.left) {
      this.left = node;
      node.parent = this;
    } else if (!this.right) {
      this.right = node;
      node.parent = this;
    }

	}

  removeChild(node) {
	if (this.left && this.left === node) {
      node.parent = null;
      this.left = null;
     } else if (this.right && this.right === node) {
      node.parent = null;
      this.right = null;
     } else {
      throw new Error("Node isn't a child of this node");
     }

	}

  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

	swapWithParent() {
		
	}
}

module.exports = Node;
