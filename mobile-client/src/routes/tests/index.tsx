import { Button } from "@studylessshape/mdui-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/tests/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <>
      <div>Start</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <Button onClick={() => navigate({ to: "/tests/child" })}>To Child</Button>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>Hello "/tests/"!</div>
      <div>end</div>
    </>
  );
}
