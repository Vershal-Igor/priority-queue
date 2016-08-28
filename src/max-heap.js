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
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
	}

	clear() {
		
	}

	insertNode(node) {
		
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

