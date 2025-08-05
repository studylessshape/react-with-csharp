import type { MenuItemProps } from "../components/Layout";
import { SemiIcon } from "../components/SemiIcon";
import type { FeatResource } from "../services";
import { buildTree } from "./build_tree";

export function featResourceToMenuProps(
  skipRoot: boolean,
  featResources: FeatResource[] | undefined
) {
  var paramFeatResources = featResources;
  if (featResources) {
    paramFeatResources = featResources
      .filter((fr) => fr.kind == 0)
      .filter((fr) => !skipRoot || (skipRoot && fr.parentId != undefined))
      .sort((a, b) => (a.order == b.order ? a.id - b.id : a.order - b.order));
  }

  return buildTree<FeatResource, MenuItemProps>(
    paramFeatResources,
    (node, data) => data.parentId == node.id,
    (node) => ({
      key: node.id,
      path: node.url,
      name: node.name,
      descprition: node.description,
      icon: new SemiIcon({ name: node.icon }).render(),
    })
  );
}
