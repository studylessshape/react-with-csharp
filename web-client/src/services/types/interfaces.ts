export type ModeStateError = { [key: string]: [[string]] };
export type NormalError = string | ModeStateError;
export type ResError<T = any> = T | NormalError;

export type None = {} | undefined | null;

export interface PagedListProps {
  total: number;
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface PagedList<T> extends PagedListProps {
  content: T[];
}
