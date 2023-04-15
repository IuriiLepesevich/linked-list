function Node(value, nextNode = null) {
  let nodeValue = value;
  let nodeNextNode = nextNode;

  const getValue = () => nodeValue;
  const getNextNode = () => nodeNextNode;

  const setValue = (newValue) => {
    nodeValue = newValue;
  };
  const setNextNode = (newNextNode) => {
    nodeNextNode = newNextNode;
  };

  return {
    getValue,
    getNextNode,
    setValue,
    setNextNode,
  };
}

function LinkedList() {
  let headNode = Node();
  let tailNode = Node();

  const append = (value) => {
    if (!headNode.getValue()) {
      headNode.setValue(value);
      tailNode.setValue(value);
    } else {
      let currentNode = headNode;
      while (currentNode.getNextNode()) {
        currentNode = currentNode.getNextNode();
      }
      tailNode = Node(value);
      currentNode.setNextNode(tailNode);
    }
  };

  const prepend = (value) => {
    if (!headNode.getValue()) {
      headNode = Node(value);
    } else {
      headNode = Node(value, headNode);
    }
  };

  const size = () => {
    if (!headNode.getValue()) return 0;
    let counter = 1;

    let nextNode = headNode;
    while (nextNode.getNextNode()) {
      nextNode = nextNode.getNextNode();
      counter += 1;
    }

    return counter;
  };

  const head = () => headNode;

  const tail = () => tailNode;

  const at = (index) => {
    const listSize = size();
    if (listSize - 1 < index) return null;

    let currentNode = headNode;
    for (let i = 0; i < index; i += 1) {
      currentNode = currentNode.getNextNode();
    }

    return currentNode;
  };

  const pop = () => {
    const listSize = size();
    if (!listSize) return;
    if (listSize === 1) {
      headNode = Node();
    }
    const preLastNode = at(listSize - 2);
    preLastNode.setNextNode(null);
    tailNode = preLastNode;
  };

  const contains = (value) => {
    const listSize = size();
    let currentNode = headNode;
    for (let i = 0; i < listSize; i += 1) {
      if (currentNode.getValue() === value) return true;
      currentNode = currentNode.getNextNode();
    }

    return false;
  };

  const find = (value) => {
    const listSize = size();
    let currentNode = headNode;
    for (let i = 0; i < listSize; i += 1) {
      if (currentNode.getValue() === value) return i;
      currentNode = currentNode.getNextNode();
    }

    return null;
  };

  const insertAt = (value, index) => {
    if (index === 0) {
      prepend(value);
      return;
    }
    if (index === size()) {
      append(value);
      return;
    }
    const targetNode = at(index);
    if (targetNode) {
      const newNode = Node(value);
      const preTargetNode = at(index - 1);
      preTargetNode.setNextNode(newNode);
      newNode.setNextNode(targetNode);
    }
  };

  const removeAt = (index) => {
    if (index === 0) {
      headNode = headNode.getNextNode();
    }
    const targetNode = at(index);
    if (targetNode) {
      const preTargetNode = at(index - 1);
      preTargetNode.setNextNode(targetNode.getNextNode());
    }
  };

  const toString = () => {
    if (!size()) return "null";
    let currentNode = headNode;
    let stringList = `${currentNode.getValue()}`;
    while (currentNode.getNextNode()) {
      currentNode = currentNode.getNextNode();
      stringList = `${stringList} --> ${currentNode.getValue()}`;
    }
    stringList = `${stringList} --> null`;

    return stringList;
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    insertAt,
    removeAt,
    toString,
  };
}

const LinkedListInstance = LinkedList();

LinkedListInstance.append(11);
LinkedListInstance.append(12);
LinkedListInstance.append(13);

LinkedListInstance.prepend(44);

console.log(LinkedListInstance.toString());

console.log("Size: ", LinkedListInstance.size());

console.log("Element at index 1: ", LinkedListInstance.at(1).getValue());

console.log("Does list contains 13: ", LinkedListInstance.contains(13));

console.log("Index of element 13: ", LinkedListInstance.find(13));

LinkedListInstance.insertAt(2, 1);

console.log(
  "New list after insert 2 at index 1: ",
  LinkedListInstance.toString()
);

LinkedListInstance.removeAt(1);

console.log(
  "New list after remove node at index 1: ",
  LinkedListInstance.toString()
);
