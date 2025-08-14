import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from "@douyinfe/semi-illustrations";
import { Empty, Pagination, Table } from "@douyinfe/semi-ui";
import type { PaginationProps } from "@douyinfe/semi-ui/lib/es/pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  formatPaginationData,
  type DataTableProps,
  type PaginationData,
} from "./types";
import type { Scroll } from "@douyinfe/semi-ui/lib/es/table";

export * from "./types";

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
  const [scroll, setScroll] = useState(undefined as Scroll | undefined);
  const divRef = useRef(null as HTMLDivElement | null);

  const pagination: PaginationProps | undefined = useMemo(
    () =>
      props.total == undefined
        ? undefined
        : {
            pageSizeOpts: props.pageSizeOpts,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: true,
            onPageChange: (currentPage) => {
              setPageData({ ...pageData, currentPage: currentPage });
              loadData({ ...pageData, currentPage: currentPage });
            },
            onPageSizeChange: (newPageSize) => {
              const total = pageData.total ?? 0;
              var currentPage = pageData.currentPage ?? 1;
              const newTotalPage = Math.ceil(total / newPageSize);

              if (currentPage > 1 && newTotalPage < currentPage) {
                currentPage = newTotalPage;
              }

              if (currentPage <= 0) {
                currentPage = 1;
              }
              setPageData({
                currentPage: currentPage,
                total: pageData.total,
                pageSize: newPageSize,
              });
              loadData({
                pageSize: newPageSize,
                currentPage: currentPage,
                total: total,
              });
            },
          },
    [props.total]
  );

  var renderLoopLoading = false;

  function loadData(page?: PaginationData) {
    if (!renderLoopLoading && props.loadData) {
      renderLoopLoading = true;
      setLoading(true);
      props
        .loadData({
          currentPage: page?.currentPage ?? 1,
          pageSize: page?.pageSize ?? 10,
        })
        .then((value) => {
          if (value && props.dataToTableData) {
            setTableData(props.dataToTableData(value));
            if (props.total) {
              setPageData({ ...page, total: props.total(value) });
            }
          }
        })
        .finally(() => {
          setLoading(false);
          renderLoopLoading = false;
        });
    }
  }

  function setTableScroll() {
    if (divRef.current && props.full) {
      const element = divRef.current;
      const x =
        props.full.widthReduce == undefined
          ? props.scroll?.x
          : element.clientWidth - props.full.widthReduce;
      const y =
        props.full.heightReduce == undefined
          ? props.scroll?.y
          : element.clientHeight - props.full.heightReduce;
      setScroll({ x: x, y: y });
    }
  }

  function resizeHandler(this: Window, ev: UIEvent) {
    setTableScroll();
  }

  useEffect(() => {
    loadData(pageData);
  }, [props.changing]);

  useEffect(() => {
    loadData({ currentPage: 1, pageSize: pageData.pageSize });
  }, [props.changingForResetPage]);

  useEffect(() => {
    if (props.data && props.dataToTableData) {
      setTableData(props.dataToTableData(props.data));
      if (props.total) {
        setPageData({ ...pageData, total: props.total(props.data) });
      }
      setLoading(false);
    }
  }, [props.data]);

  useEffect(() => {
    setTableScroll();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [divRef]);

  return (
    <div
      ref={divRef}
      className={`semi-color-bg-1 semi-border-color border border-solid flex flex-col ${props.className ?? ""}`}
      style={props.style}
    >
      <Table
        title={props.title}
        className={`flex-1 ${props.tableClassName ?? ""}`}
        size={props.size}
        dataSource={tableData}
        columns={props.columns}
        loading={props.loading ?? loading}
        defaultExpandedRowKeys={props.defaultExpandedRowKeys}
        sticky={props.scroll != undefined || scroll != undefined}
        bordered
        resizable={props.resizable}
        scroll={scroll ?? props.scroll}
        style={props.tableStyle}
        rowSelection={props.rowSelection}
        pagination={false}
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
      {pagination == undefined || pageData.total == 0 ? undefined : (
        <div className="flex justify-between items-center p-3.5 flex-wrap xl:flex-nowrap">
          <div className="semi-color-text-2 font-size-3.5 text-nowrap">
            {formatPaginationData(pageData)}
          </div>
          <Pagination
            {...pageData}
            {...pagination}
            className="text-nowrap flex-wrap xl:flex-nowrap"
            popoverPosition={props.popoverPosition}
            disabled={loading}
          ></Pagination>
        </div>
      )}
    </div>
  );
}
