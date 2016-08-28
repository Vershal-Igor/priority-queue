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
    /* Чтобы обновить ссылки parent, left, right не только в самих нодах, которые меняем местами, но
    и в дочерних (parent) и родительских (left/right) вычищаем все ссылки на эти ноды
    из "родителей" и "детей", обнулияем ссылки из этих нод, а потом все расставим заново.
    Для этого:
     1) скэшируем ссылки на left и right у всех задействованных в изменениях нодах
     2) уберем в нодах, которые мы меняем местами ссылку на parent - посредством вызова метода removeChild у родителей
     3) очистим собственные свойства left/right у нод, которые меняем местами
     4) проставим ссылки на parent в наших нодах заново, посредством вызова метода appendChild у , и  в  (если он существует), а parent - в child.
        а) parent.parent (передав child)
        б) child (передав parent) - т.е. по сути меняя местами ноды
     5) проставим ссылки на left и right, которые сохранили в кэше. Для child - ссылки из parent, для parent - из child
     */
		 if (this.parent) {
      var childNode = this;
      var parentNode = this.parent;
      var grandNode = parentNode.parent;
      var position;

      if (parentNode.left === childNode) {
        position = 'left';
      } else {
        position = 'right';
      }

      parentNode.removeChild(childNode);

      // Кэшируем линки на left/right в для childNode и для parentNode
      var tmp_child = {
        left: childNode.left,
        right: childNode.right
      };

      var tmp_parent = {
        left: parentNode.left,
        right: parentNode.right
      };

      // "Смотрим" на уровень выше - если у parentNode был свой Parent, надо в нем сменить указатель на childNode.
      if (grandNode) { //
        // Добавляем childNode в parentNode.parent, если он существует.
        grandNode.removeChild(parentNode);
        grandNode.appendChild(childNode);
      }


      // Удаляем линки на left и right в parent и child
      if (parentNode.left) {
        parentNode.removeChild(parentNode.left);
      }
      if (parentNode.right) {
        parentNode.removeChild(parentNode.right);
      }
      if (childNode.left) {
        childNode.removeChild(childNode.left);
      }
      if (childNode.right) {
        childNode.removeChild(childNode.right);
      }

      // Сеттим новые линки на left и right в parent и child.
      if (tmp_child.left) {
        parentNode.appendChild(tmp_child.left);
      }
      if (tmp_child.right) {
        parentNode.appendChild(tmp_child.right);
      }

      if (position == 'left') {
        childNode.appendChild(parentNode);
        if (tmp_parent.right) {
          childNode.appendChild(tmp_parent.right);
        }
      } else {
        childNode.appendChild(tmp_parent.left);
        childNode.appendChild(parentNode);
      }

    }
  }
}

module.exports = Node;