import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import type { FeatResource } from "../services";
import * as Icon from "@douyinfe/semi-icons";
import { Space, Typography } from "@douyinfe/semi-ui";

const { Text } = Typography;

function featResourceLabel(node: FeatResource) {
  const urlNode =
    node.url == "" ? undefined : <Text type="secondary">({node.url})</Text>;
  return (
    <Space>
      <div className="inline">{node.description ?? node.name}</div>
      {urlNode}
    </Space>
  );
}

function featResourceToTreeDataIter(
  node: FeatResource,
  featResources: FeatResource[],
) {
  var children = featResources.filter((fr) => fr.parentId == node.id);
  var treeData: TreeNodeData = {
    key: node.id.toString(),
    label: featResourceLabel(node),
    icon: node.icon ? Icon[node.icon].render() : undefined,
    data: node,
  };
  if (children.length > 0) {
    treeData.children = [];
    children.forEach((fr) => {
      featResources.splice(featResources.indexOf(fr), 1);
      treeData.children?.push(featResourceToTreeDataIter(fr, featResources));
    });
  }

  return treeData;
}

/**
 *
 * @param featResources
 * @returns return TreeNodeData and the perporty `data` is FeatResource
 */
export function featResourceToTreeData(featResources?: FeatResource[]) {
  var nodes = [] as TreeNodeData[];
  if (featResources && featResources.length > 0) {
    var orderedRes = featResources
      .filter((fr) => fr.kind == 0)
      .sort((a, b) => (a.order == b.order ? a.id - b.id : a.order - b.order));
    while (orderedRes.length > 0) {
      var featRes = orderedRes.shift();
      if (featRes) {
        nodes.push(featResourceToTreeDataIter(featRes, orderedRes));
      }
    }
  }
  return nodes;
}

export function filterNode(
  nodes: TreeNodeData[],
  condition: (data: TreeNodeData) => boolean,
) {
  return nodes.map((n) => {
    var children = n.children;
    var disabled = !condition(n);
    if (children && children.length > 0) {
      children = filterNode(children, condition);
    }
    return {
      ...n,
      children: children,
      disabled: disabled,
    };
  });
}

export function findNode(
  nodes: TreeNodeData[],
  condition: (data: TreeNodeData) => boolean,
): TreeNodeData | undefined {
  var node = nodes.find(condition);
  if (node == undefined) {
    for (var n of nodes.filter(
      (n) => n.children != undefined && n.children.length > 0,
    )) {
      node = findNode(n.children!, condition);
    }
  }
  return node;
}
