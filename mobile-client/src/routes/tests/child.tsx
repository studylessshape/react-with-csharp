import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tests/child')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tests/child"!</div>
}
