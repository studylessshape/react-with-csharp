import { type FeatResource, getMenuPermissions } from "@/services";
import type { FeatResourceTableData } from "@/utils/feat_to_data_source";
import { handleResp } from "@/utils/resp_flow";
import { Empty, Table } from "@douyinfe/semi-ui";
import type {
  ColumnRender,
  ColumnProps,
  RowSelectionOnSelect,
  RowSelectionOnSelectAll,
} from "@douyinfe/semi-ui/lib/es/table";
import { useState, useMemo, useEffect } from "react";
import type { PageInfo } from "./permissionPart";
import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from "@douyinfe/semi-illustrations";

export function PermissionTable({
  parentId,
  onSelect,
  onSelectAll,
  actionRender,
}: {
  parentId?: number;
  onSelect?: RowSelectionOnSelect<FeatResourceTableData>;
  onSelectAll?: RowSelectionOnSelectAll<FeatResourceTableData>;
  actionRender?: ColumnRender<FeatResourceTableData>;
}) {
  const [permissions, setPermissions] = useState(
    undefined as FeatResource[] | undefined
  );
  const [pageInfo, setPageInfo] = useState({ pageSize: 10 } as PageInfo);
  const [loading, setLoading] = useState(false);
  const columns: ColumnProps[] = useMemo(() => {
    var cols: ColumnProps[] = [
      { title: "Id", dataIndex: "id" },
      { title: "唯一名称", dataIndex: "name" },
      { title: "描述", dataIndex: "description" },
      { title: "操作", fixed: true, render: actionRender },
    ];
    if (!actionRender) {
      cols.pop();
    }
    return cols;
  }, [actionRender]);

  // function loadPermissions(page: number) {
  //   if (parentId) {
  //     setLoading(true);
  //     handleResp(getMenuPermissions(page, pageInfo.pageSize, parentId), {
  //       handleOk: (data) => {
  //         setPageInfo({
  //           ...pageInfo,
  //           page: data.pageIndex,
  //           total: data.total,
  //         });
  //         setPermissions(data.content);
  //       },
  //     }).finally(() => {
  //       setLoading(false);
  //     });
  //   }
  // }

  async function loadPermissions(page?: PaginationData) {
    if (props.parent) {
      const result = await getMenuPermissions(
        page?.currentPage ?? 1,
        page?.pageSize ?? 10,
        props.parent.id
      );
      if (result.success) {
        return result.data;
      } else {
        Toast.error(result.message ?? "加载许可失败");
      }
    }
    return undefined;
  }

  useEffect(() => {
    loadPermissions(1);
  }, [parentId, pageInfo.pageSize]);

  useEffect(() => {
    if (pageInfo.page && !loading) loadPermissions(pageInfo.page);
  }, [pageInfo.page]);

  const tableData: FeatResourceTableData[] | undefined = permissions?.map(
    (f) => ({ key: f.id, ...f })
  );

  return (
    <div className="w-full">
      <Table
        className="semi-color-bg-1 semi-border-color border border-solid"
        loading={loading}
        dataSource={tableData}
        columns={columns}
        bordered
        resizable
        scroll={{ x: 500, y: 500 }}
        style={{ height: 600 }}
        pagination={{
          currentPage: pageInfo.page,
          total: pageInfo.total,
          pageSize: pageInfo.pageSize,
          pageSizeOpts: [10, 20, 40, 60, 80, 100],
          onPageChange: (currentPage) =>
            setPageInfo({ ...pageInfo, page: currentPage }),
          onPageSizeChange: (newPageSize) =>
            setPageInfo({ ...pageInfo, pageSize: newPageSize }),
        }}
        rowSelection={{
          fixed: true,
          onSelect: onSelect,
          onSelectAll: onSelectAll,
        }}
        empty={
          <Empty
            image={<IllustrationNoResult />}
            darkModeImage={<IllustrationNoResultDark />}
          >
            没有数据
          </Empty>
        }
      ></Table>
    </div>
  );
}
