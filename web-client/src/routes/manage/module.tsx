import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage/module')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manage/module"!</div>
}
