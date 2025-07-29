import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage/user')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manage/user"!</div>
}
