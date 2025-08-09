import { getMenuPermissions } from "@/services";
import type { FeatResourceTableData } from "@/utils/featToDataSource";
import { Toast } from "@douyinfe/semi-ui";
import type {
  ColumnRender,
  ColumnProps,
  RowSelectionOnSelect,
  RowSelectionOnSelectAll,
} from "@douyinfe/semi-ui/lib/es/table";
import { useMemo } from "react";
import { DataTable, type PaginationData } from "@/components/DataTable";

export function PermissionTable({
  parentId,
  refresh,
  onSelect,
  onSelectAll,
  actionRender,
}: {
  parentId?: number;
  refresh?: any;
  onSelect?: RowSelectionOnSelect<FeatResourceTableData>;
  onSelectAll?: RowSelectionOnSelectAll<FeatResourceTableData>;
  actionRender?: ColumnRender<FeatResourceTableData>;
}) {
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

  async function loadPermissions(page?: PaginationData) {
    if (parentId) {
      const result = await getMenuPermissions(
        page?.currentPage ?? 1,
        page?.pageSize ?? 10,
        parentId,
      );
      if (result.success) {
        return result.data;
      } else {
        Toast.error(result.message ?? "加载许可失败");
      }
    }
    return undefined;
  }

  return (
    <div className="w-full">
      <DataTable
        loadData={loadPermissions}
        dataToTableData={(data) =>
          data.content.map(
            (f) => ({ key: f.id, ...f }) as FeatResourceTableData,
          )
        }
        size="small"
        total={(data) => data.total}
        pageSizeOpts={[10, 20, 40, 80, 100]}
        columns={columns}
        scroll={{ x: 400, y: 500 }}
        rowSelection={{
          fixed: true,
          onSelect: onSelect,
          onSelectAll: onSelectAll,
        }}
        changingForResetPage={parentId}
        changing={refresh}
      ></DataTable>
    </div>
  );
}
