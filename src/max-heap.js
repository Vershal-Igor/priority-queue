"use strict"
const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];

    this.lastInserted = null;
    this.heapSize = 0;
  }

  push(data, priority) {
    var node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    
      if(this.root === null) return;
		var detached = this.detachRoot();
		this.heapSize --;
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		return detached.data;
		
    }
  

  detachRoot() {
    var lastDetachedRoot = this.root;
    this.root = null;
    // removes root from parentNodes
    var rootIndex = this.parentNodes.indexOf(lastDetachedRoot);
    if (rootIndex !== -1) {
      // т.к. root будет всегда первым
      this.parentNodes = this.parentNodes.slice(1);
    }
    return lastDetachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    this.lastInserted.remove();
    if (detached.left !== null) {
      this.lastInserted.appendChild(detached.left)
    }
    if (detached.right !== null) {
      this.lastInserted.appendChild(detached.right)
    }
    this.root = this.lastInserted;
    this.afterShift();
  }

  size() {
    return this.heapSize;
  }

  isEmpty() {
    return (!this.size());
  }

  clear() {
    this.detachRoot();
    this.parentNodes = [];
    this.heapSize = 0;
  }

  insertNode(node) {
    if (this.parentNodes.length === 0) {
      this.root = node;
      this.parentNodes.push(this.root);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
      if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null) {
        this.parentNodes.splice(0, 1);
      }
    }

  }

  afterShift() {
    this.lastInserted = null;
    this.heapSize = 0;
    var newParentArray = [];
    var nodesForCheck = [this.root];

    while (nodesForCheck.length > 0) {
      var newCheckArray = [];
      for (var i = 0; i < nodesForCheck.length; i++) {
        if (nodesForCheck[i].left === null && nodesForCheck[i].right === null) {
          newParentArray.push(nodesForCheck[i]);
        } else if (nodesForCheck[i].left === null || nodesForCheck[i].right === null) {
          newParentArray.push(nodesForCheck[i]);
        }
        if (nodesForCheck[i].left !== null) {
          newCheckArray.push(nodesForCheck[i].left);
        }
        if (nodesForCheck[i].right !== null) {
          newCheckArray.push(nodesForCheck[i].right);
        }
        this.lastInserted = nodesForCheck[i];
        this.heapSize++;
      }
      nodesForCheck = newCheckArray;
    }
    this.parentNodes = newParentArray;
  }


  shiftNodeUp(node) {
    if (node.parent !== null) {
      node.swapWithParent();
      this.shiftNodeUp(node);
    } else {
      this.root = node;
      this.afterShift();
    }
  }

  shiftNodeDown(node) {
    if (node.left || node.right) {
      var bottomNode = node.left;
      bottomNode.swapWithParent();
      if (!bottomNode.parent) {
        this.root = bottomNode;
      }
      this.shiftNodeDown(node);
    } else {
      this.afterShift();
    }
  }
}


module.exports = MaxHeap;

