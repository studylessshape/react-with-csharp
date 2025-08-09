import { DataTable } from "@/components/DataTable";
import { SemiIcon } from "@/components/SemiIcon";
import type { FeatResource } from "@/services";
import {
  featResourceToDataSource,
  type FeatResourceTableData,
} from "@/utils/featToDataSource";
import { Space, Table } from "@douyinfe/semi-ui";
import type {
  RowSelectionOnSelect,
  RowSelectionOnSelectAll,
  ColumnRender,
  ColumnProps,
} from "@douyinfe/semi-ui/lib/es/table";
import { useMemo, type ReactNode } from "react";

export function MenuDataTable({
  menus,
  loading,
  onDoubleClickRow,
  onSelect,
  onSelectAll,
  actionRender,
}: {
  menus: FeatResource[] | undefined;
  loading?: boolean;
  onDoubleClickRow?: (row: FeatResource) => void;
  onSelect?: RowSelectionOnSelect<FeatResourceTableData>;
  onSelectAll?: RowSelectionOnSelectAll<FeatResourceTableData>;
  actionRender?: ColumnRender<FeatResourceTableData>;
}) {
  const columns: ColumnProps[] = useMemo(() => {
    var cols = [
      { title: "Id", dataIndex: "id" },
      {
        title: "唯一名称",
        dataIndex: "name",
        render: (text: ReactNode, record: FeatResourceTableData) => {
          return (
            <Space>
              <SemiIcon name={record.icon} />
              {text}
            </Space>
          );
        },
      },
      { title: "描述", dataIndex: "description" },
      { title: "地址", dataIndex: "url" },
      {
        title: "操作",
        fixed: true,
        render: actionRender,
      },
    ];
    if (!actionRender) {
      cols.pop();
    }
    return cols;
  }, [actionRender]);

  return (
    <DataTable
      data={menus}
      dataToTableData={(data) => featResourceToDataSource(data)}
      columns={columns}
      loading={loading}
      size="small"
      onDoubleClickRow={onDoubleClickRow}
      defaultExpandedRowKeys={[1]}
      rowSelection={{
        fixed: true,
        onSelect: onSelect,
        onSelectAll: onSelectAll,
      }}
      scroll={{ x: 400, y: 500 }}
      style={{ height: 500 }}
    />
  );
}
