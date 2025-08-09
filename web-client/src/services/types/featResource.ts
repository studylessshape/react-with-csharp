export interface FeatResourceDetail {
  name: string;
  description?: string;
  parentId?: number;
  tag: string;
  url: string;
  order: number;
  icon?: string;
}

export interface FeatResource extends FeatResourceDetail {
  id: number;
  /**
   * @summary 为 `0` 时是菜单，为 `1` 时是按钮
   */
  kind: number;
}
