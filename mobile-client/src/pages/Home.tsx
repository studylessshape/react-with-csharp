import { Button, Slot } from "@studylessshape/mdui-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  return (
    <>
      <div className="w-full">
        <Button onClick={() => setCount(count + 1)}>
          <Slot slot="badge">{count}</Slot>
          Add Block
        </Button>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>功能测试{i}</div>
        ))}
        <div className="font-size-4 m-t-1">end</div>
        <Button onClick={() => navigate({ to: "/tests" })}>To TestPage</Button>
      </div>
    </>
  );
}
