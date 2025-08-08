import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from "@douyinfe/semi-illustrations";
import { Empty, Table } from "@douyinfe/semi-ui";
import type {
  ColumnProps,
  Scroll,
  RowSelection,
  Size,
} from "@douyinfe/semi-ui/lib/es/table";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

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
  dataToTableData: (data: LoadingDataType) => TableDataType[];
  columns: ColumnProps[];
  total?: (data: LoadingDataType) => number;
  pageSizeOpts?: Array<number>;
  onDoubleClickRow?: (row: RecordType) => void;
  rowSelection?: RowSelection<TableDataType> | undefined;
  size?: Size;
  scroll?: Scroll;
  defaultExpandedRowKeys?: (string | number)[];
  style?: CSSProperties;
  className?: string;
  loading?: boolean;
  changing?: any;
  resizable?: boolean;
  emptyTitle?: ReactNode;
  emptyMessage?: ReactNode;
  defaultPageSize?: number;
}

export function DataTable<
  TableDataType extends { children?: TableDataType[] } & RecordType,
  LoadingDataType extends object,
  RecordType = Record<string, any>,
>(props: DataTableProps<TableDataType, LoadingDataType, RecordType>) {
  const [tableData, setTableData] = useState(
    undefined as TableDataType[] | undefined
  );
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({
    currentPage: 1,
    pageSize: props.defaultPageSize ?? 10,
  } as PaginationData);

  function loadData(page?: PaginationData) {
    if (!loading && props.loadData) {
      setLoading(true);
      props
        .loadData(page)
        .then((value) => {
          if (value) {
            setTableData(props.dataToTableData(value));
            if (props.total) {
              setPageData({ ...page, total: props.total(value) });
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    loadData(pageData);
  }, [props.loadData, props.changing]);

  useEffect(() => {
    if (props.data) {
      setTableData(props.dataToTableData(props.data));
      if (props.total) {
        setPageData({ ...pageData, total: props.total(props.data) });
      }
      setLoading(false);
    }
  }, [props.data]);

  return (
    <Table
      className={`semi-color-bg-1 semi-border-color border border-solid ${props.className ?? ""}`}
      size={props.size}
      dataSource={tableData}
      columns={props.columns}
      loading={props.loading ?? loading}
      defaultExpandedRowKeys={props.defaultExpandedRowKeys}
      sticky={props.scroll != undefined}
      bordered
      resizable={props.resizable}
      scroll={props.scroll}
      style={props.style}
      rowSelection={props.rowSelection}
      pagination={
        props.total
          ? {
              ...pageData,
              pageSizeOpts: props.pageSizeOpts,
              showSizeChanger: true,
              showQuickJumper: true,
              onPageChange: (currentPage) => {
                setPageData({ ...pageData, currentPage: currentPage });
                loadData({ ...pageData, currentPage: currentPage });
              },
              onPageSizeChange: (newPageSize) => {
                setPageData({ ...pageData, pageSize: newPageSize });
                loadData({
                  ...pageData,
                  pageSize: newPageSize,
                  currentPage: 1,
                });
              },
            }
          : false
      }
      onRow={(record) => {
        const row = record as RecordType;
        return {
          onDoubleClick: () => {
            if (props.onDoubleClickRow) props.onDoubleClickRow(row);
          },
        };
      }}
      empty={
        <Empty
          image={<IllustrationNoResult />}
          darkModeImage={<IllustrationNoResultDark />}
          title={props.emptyTitle}
        >
          {props.emptyMessage ?? "没有数据"}
        </Empty>
      }
    ></Table>
  );
}
