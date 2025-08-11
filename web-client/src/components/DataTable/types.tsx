import type { PopoverPosition } from "@douyinfe/semi-ui/lib/es/pagination";
import type { Size } from "@douyinfe/semi-ui/lib/es/table";
import type {
  ColumnProps,
  RowSelection,
  Scroll,
} from "@douyinfe/semi-ui/lib/es/table";
import type { CSSProperties, ReactNode } from "react";

export interface PaginationData {
  currentPage?: number;
  pageSize?: number;
  total?: number;
}

export interface DataTableProps<
  TableDataType extends { children?: TableDataType[] } & RecordType,
  LoadingDataType extends object,
  RecordType = Record<string, any>,
> {
  loadData?: (
    pageData?: PaginationData
  ) => Promise<LoadingDataType | undefined>;
  data?: LoadingDataType;
  dataToTableData?: (data: LoadingDataType) => TableDataType[];
  columns?: ColumnProps[];
  total?: (data: LoadingDataType) => number;
  pageSizeOpts?: Array<number>;
  onDoubleClickRow?: (row: RecordType) => void;
  rowSelection?: RowSelection<TableDataType> | undefined;
  size?: Size;
  scroll?: Scroll;
  defaultExpandedRowKeys?: (string | number)[];
  style?: CSSProperties;
  className?: string;
  tableStyle?: CSSProperties;
  tableClassName?: string;
  loading?: boolean;
  changing?: any;
  changingForResetPage?: any;
  resizable?: boolean;
  emptyTitle?: ReactNode;
  emptyMessage?: ReactNode;
  defaultPageSize?: number;
  title?: ReactNode | ((pageData?: TableDataType[]) => ReactNode);
  popoverPosition?: PopoverPosition;
}

export function formatPaginationData(pageData: PaginationData) {
  const total = pageData.total ?? 0;
  const currentPage = pageData.currentPage ?? 1;
  const pageSize = pageData.pageSize ?? 0;

  const currentStart = Math.min((currentPage - 1) * pageSize + 1, total);
  const currentEnd = Math.min(currentPage * pageSize, total);

  if (total <= 0) {
    return "";
  }

  return `显示第 ${currentStart} 条-第 ${currentEnd} 条，共 ${total} 条`;
}
