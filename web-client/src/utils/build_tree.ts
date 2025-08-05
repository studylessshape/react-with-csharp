/**
 * @param node current node
 * @param data data from datas
 */
type ChildrenFilter<T> = (node: T, data: T) => boolean;

/**
 * only need set all props except children
 */
type TypeToTreeNode<T, R> = (data: T) => R;

function buildTreeIter<T, R extends { children?: R[] }>(
  node: T,
  childrenFilter: ChildrenFilter<T>,
  dataToR: TypeToTreeNode<T, R>,
  datas: T[]
) {
  var children = datas.filter((data) => childrenFilter(node, data));
  var r: R = dataToR(node);
  if (children.length > 0) {
    r.children = [];
    children.forEach((n) => {
      datas.splice(datas.indexOf(n), 1);
      r.children?.push(buildTreeIter(n, childrenFilter, dataToR, datas));
    });
  }

  return r;
}

export function buildTree<T, R extends { children?: R[] }>(
  datas: T[] | undefined,
  childrenFilter: ChildrenFilter<T>,
  dataToR: TypeToTreeNode<T, R>
) {
  var nodes = [] as R[];
  var innerDatas = datas?.map((d) => d);
  if (innerDatas && innerDatas.length > 0) {
    while (innerDatas.length > 0) {
      var data = innerDatas.shift();
      if (data) {
        nodes.push(buildTreeIter(data, childrenFilter, dataToR, innerDatas));
      }
    }
  }
  return nodes;
}

export function findNode<T extends { children?: T[] }>(
  nodes: T[],
  condition: (data: T) => boolean
): T | undefined {
  var node = nodes.find(condition);
  if (node == undefined) {
    for (var n of nodes.filter(
      (n) => n.children != undefined && n.children.length > 0
    )) {
      node = findNode(n.children!, condition);
    }
  }
  return node;
}
