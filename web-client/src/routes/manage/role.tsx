import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage/role')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manage/role"!</div>
}
