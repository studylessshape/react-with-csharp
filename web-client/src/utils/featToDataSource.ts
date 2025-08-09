import type { FeatResource } from "../services";
import { buildTree } from "./buildTree";

export interface FeatResourceTableData extends FeatResource {
  key: number;
  children?: FeatResourceTableData[];
}

export function featResourceToDataSource(
  feats: FeatResource[] | undefined,
): FeatResourceTableData[] {
  var filterResources = feats;
  if (feats) {
    filterResources = feats
      .filter((fr) => fr.kind == 0)
      .sort((a, b) =>
        a.order == b.order ? a.id - b.id : a.order < b.order ? -1 : 1,
      );
  }
  return buildTree<FeatResource, FeatResourceTableData>(
    feats,
    (node, data) => data.parentId == node.id,
    (data) => ({ ...data, key: data.id }),
  );
}
