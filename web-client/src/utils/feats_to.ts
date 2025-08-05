import type { FeatResource } from "../services";

export interface ChildrenType {
  children?: ChildrenType[];
}

function featResourceToTreeIter<R extends { children?: R[] }>(
  node: FeatResource,
  featToR: (feat: FeatResource) => R,
  featResources: FeatResource[]
) {
  var children = featResources.filter((fr) => fr.parentId == node.id);
  var r: R = featToR(node);
  if (children.length > 0) {
    r.children = [];
    children.forEach((fr) => {
      featResources.splice(featResources.indexOf(fr), 1);
      r.children?.push(featResourceToTreeIter(fr, featToR, featResources));
    });
  }

  return r;
}

export function featResourceToTree<R extends { children?: R[] }>(
  featResources: FeatResource[] | undefined,
  featToR: (feat: FeatResource) => R
) {
  var nodes = [] as R[];
  if (featResources && featResources.length > 0) {
    while (featResources.length > 0) {
      var featRes = featResources.shift();
      if (featRes) {
        nodes.push(featResourceToTreeIter(featRes, featToR, featResources));
      }
    }
  }
  return nodes;
}
