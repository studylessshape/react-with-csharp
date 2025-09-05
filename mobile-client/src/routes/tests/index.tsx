import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tests/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tests/"!</div>
}
