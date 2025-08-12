/**
 * @param node current node
 * @param data data from datas
 * @returns If `data` is `node` children
 */
type ChildrenFilter<T> = (node: T, data: T) => boolean;

/**
 * only need set all props except children
 */
type TypeToTreeNode<T, R> = (data: T) => R;

class TreeIter<T, R extends { children?: R[] }> {
  dataNodes: { data: T; node: R }[];
  childrenFilter: ChildrenFilter<T>;
  constructor(
    datas: T[] | undefined,
    dataToR: TypeToTreeNode<T, R>,
    childrenFilter: ChildrenFilter<T>
  ) {
    this.dataNodes = datas?.map((v) => ({ data: v, node: dataToR(v) })) ?? [];
    this.childrenFilter = childrenFilter;
  }

  buildTree(): R[] {
    for (var index = 0; index < this.dataNodes.length; index++) {
      var node = this.dataNodes[index];
      this.buildChildren(this.dataNodes[index]);
      var currentIndex = this.dataNodes.findIndex((dn) => dn.data == node.data);
      if (currentIndex >= 0) {
        index = currentIndex;
      }
    }
    return this.dataNodes.map((n) => n.node);
  }

  buildChildren(node: { data: T; node: R }) {
    var children = this.dataNodes.filter((n) =>
      this.childrenFilter(node.data, n.data)
    );

    this.dataNodes = this.dataNodes.filter(
      (n) => !children.some((v) => v == n)
    );
    for (var child of children) {
      child = this.buildChildren(child);
      if (node.node.children) {
        node.node.children.push(child.node);
      } else {
        node.node.children = [child.node];
      }
    }
    return node;
  }
}

/**
 *
 * @param datas
 * @param childrenFilter @inheritdoc
 * @param dataToR
 * @returns
 */
export function buildTree<T, R extends { children?: R[] }>(
  datas: T[] | undefined,
  childrenFilter: ChildrenFilter<T>,
  dataToR: TypeToTreeNode<T, R>
) {
  return new TreeIter(datas, dataToR, childrenFilter).buildTree();
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

export function mapNodes<T extends { children?: T[] }, R = T>(
  datas: T[] | undefined,
  map: (data: T) => R
): R[] | undefined {
  return datas == undefined
    ? undefined
    : datas.map((node) => {
        const { children, ...nodeData } = node;
        const data = map({ ...nodeData } as T);
        return {
          ...data,
          children: mapNodes(children, map),
        } as R;
      });
}
