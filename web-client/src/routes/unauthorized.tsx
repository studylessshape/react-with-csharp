import {
  IllustrationNoAccess,
  IllustrationNoAccessDark,
} from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/unauthorized")({
  component: RouteComponent,
});

export class UnauthorizedError extends Error {}

function RouteComponent() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Empty
        image={<IllustrationNoAccess />}
        darkModeImage={<IllustrationNoAccessDark />}
        description={"无权限访问"}
      />
    </div>
  );
}
