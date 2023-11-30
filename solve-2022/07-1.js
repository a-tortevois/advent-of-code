// Part 1

const NODE_SIZE_LIMIT = 100_000;
const NODE_TYPE_DIR = 'dir';
const NODE_TYPE_FILE = 'file';

class Node {
  constructor(name, type, parentNode, size = 0) {
    this.name = name;
    this.type = type;
    this.parentNode = parentNode;
    this.size = size;
    this.childNode = [];
  }
}

const getNodeTree = () => {
  let actualNode = null;
  for (let line of input.split('\n')) {
    line = line.split(' ');
    if (line[0] === '$') {
      if (line[1] === 'cd') {
        if (line[2] === '..') {
          actualNode = actualNode.parentNode;
        } else {
          const node = new Node(line[2], NODE_TYPE_DIR, actualNode);
          if (actualNode !== null) {
            actualNode.childNode.push(node);
          }
          actualNode = node;
        }
      }
    } else if (line[0] === NODE_TYPE_DIR) {
      // consider that each directory will be traversed with the ls command
    } else {
      // Increase size for all parentNode
      let node = actualNode;
      while (node !== null) {
        node.size += parseInt(line[0], 10);
        node = node.parentNode;
      }
      actualNode.childNode.push(new Node(line[1], NODE_TYPE_FILE, actualNode, parseInt(line[0], 10)));
    }
  }

  // Go back to the root
  while (actualNode.parentNode !== null) {
    actualNode = actualNode.parentNode;
  }

  return actualNode;
};

const exploreNode = (node) => {
  let totalSize = 0;
  if (node.type === NODE_TYPE_DIR) {
    if (node.size < NODE_SIZE_LIMIT) {
      totalSize += node.size;
    }
    for (const childNode of node.childNode) {
      totalSize += exploreNode(childNode);
    }
  }
  return totalSize;
};

const rootNode = getNodeTree();
const totalSize = exploreNode(rootNode);

answer = totalSize;