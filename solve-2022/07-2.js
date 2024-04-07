// Part 2

const DISK_SIZE = 70_000_000;
const FREE_SIZE_REQUIREMENT = 30_000_000;
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
        node.size += Number.parseInt(line[0], 10);
        node = node.parentNode;
      }
      actualNode.childNode.push(new Node(line[1], NODE_TYPE_FILE, actualNode, Number.parseInt(line[0], 10)));
    }
  }

  // Go back to the root
  while (actualNode.parentNode !== null) {
    actualNode = actualNode.parentNode;
  }

  return actualNode;
};

const exploreNode = (node) => {
  const dirNodes = [];
  if (node.type === NODE_TYPE_DIR) {
    dirNodes.push({ name: node.name, size: node.size });
    for (const childNode of node.childNode) {
      dirNodes.push(...exploreNode(childNode));
    }
  }
  return dirNodes;
};

const findNodeToDelete = (nodes, targetSize) => {
  let answer = 0;
  for (const node of nodes) {
    if (node.size > targetSize) {
      answer = node.size;
    } else {
      // We found it!
      break;
    }
  }
  return answer;
};

const rootNode = getNodeTree();
const dirNodes = exploreNode(rootNode).sort((a, b) => b.size - a.size);
const spaceToFree = FREE_SIZE_REQUIREMENT - (DISK_SIZE - dirNodes[0].size);

answer = findNodeToDelete(dirNodes, spaceToFree);
