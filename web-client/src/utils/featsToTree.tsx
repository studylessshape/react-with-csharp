import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import type { FeatResource } from "../services";
import { Space, Typography } from "@douyinfe/semi-ui";
import { buildTree } from "./buildTree";
import { SemiIcon } from "../components/SemiIcon";

export interface FeatResourceWithChildren extends FeatResource {
  children?: FeatResourceWithChildren[];
}

const { Text } = Typography;

export function featResourceLabel(node: FeatResource) {
  const urlNode =
    node.url == "" ? undefined : <Text type="secondary">({node.url})</Text>;
  return (
    <Space className="text-nowrap">
      <div className="inline">{node.description ?? node.name}</div>
      {urlNode}
    </Space>
  );
}

/**
 *
 * @param featResources
 * @returns return TreeNodeData and the perporty `data` is FeatResource
 */
export function featResourceToTreeData(
  featResources: FeatResource[] | undefined,
  needDisabled?: (data: FeatResource) => boolean,
  filter?: (data: FeatResource) => boolean
) {
  var filterResources = featResources;
  if (featResources) {
    filterResources = featResources
      .filter((value) => {
        if (filter) {
          return filter(value);
        }
        return true;
      })
      .sort((a, b) =>
        a.order == b.order ? a.id - b.id : a.order < b.order ? -1 : 1
      );
  }
  return buildTree<FeatResource, TreeNodeData>(
    filterResources,
    (node, data) => data.parentId == node.id,
    (node) => ({
      key: node.id.toString(),
      label: featResourceLabel(node),
      icon: <SemiIcon name={node.icon} />,
      data: node,
      disabled: needDisabled == undefined ? undefined : needDisabled(node),
    })
  );
}

export function filterNode<
  T extends { disabled?: boolean; children?: T[] },
  R = T,
>(nodes: T[], condition: (data: T) => boolean, map?: (data: T) => R): R[] {
  return nodes.map((n) => {
    const { children, ...rowData } = n;
    const data = map == undefined ? (rowData as R) : map(n);
    var disabled = !condition(n);
    return {
      ...data,
      children:
        children == undefined
          ? undefined
          : filterNode(children, condition, map),
      disabled: disabled,
    };
  });
}
