import { createFileRoute } from "@tanstack/react-router";
import { RouteGuard } from "../../components/RouteGuard";
import { MenuPart } from "../../pages/manage/module/menuPart";
import { Space } from "@douyinfe/semi-ui";
import { PermissionPart } from "@/pages/manage/module/permissionPart";
import { useState } from "react";
import type { FeatResource } from "@/services";

export const Route = createFileRoute("/manage/module")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RouteGuard location redirectTo="/unauthorized">
      <RouteContent />
    </RouteGuard>
  );
}

function RouteContent() {
  const [selectedMenu, setSelectedMenus] = useState(
    undefined as FeatResource | undefined
  );

  return (
    <Space vertical className="w-full">
      <MenuPart onDoubleClickRow={(row) => setSelectedMenus(row)} />
      <PermissionPart parent={selectedMenu} />
    </Space>
  );
}
