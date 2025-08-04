import type { MenuItemProps } from "../components/Layout";
import type { FeatResource } from "../services";
import * as Icon from "@douyinfe/semi-icons";

function featResourceToMenuPropsIter(
  node: FeatResource,
  featResources: FeatResource[]
) {
  var children = featResources.filter((fr) => fr.parentId == node.id);
  var menu: MenuItemProps = {
    key: node.id,
    path: node.url,
    name: node.name,
    descprition: node.description,
    icon: node.icon ? Icon[node.icon].render() : undefined,
  };
  if (children.length > 0) {
    menu.children = [];
    children.forEach((fr) => {
      featResources.splice(featResources.indexOf(fr), 1);
      menu.children?.push(featResourceToMenuPropsIter(fr, featResources));
    });
  }

  return menu;
}

export function featResourceToMenuProps(
  skipRoot: boolean,
  featResources?: FeatResource[]
) {
  var nodes = [] as MenuItemProps[];
  if (featResources && featResources.length > 0) {
    var orderedRes = featResources
      .filter((fr) => fr.kind == 0)
      .filter((fr) => !skipRoot || (skipRoot && fr.parentId != undefined))
      .sort((a, b) => (a.order == b.order ? a.id - b.id : a.order - b.order));
    while (orderedRes.length > 0) {
      var featRes = orderedRes.shift();
      if (featRes) {
        nodes.push(featResourceToMenuPropsIter(featRes, orderedRes));
      }
    }
  }
  return nodes;
}
