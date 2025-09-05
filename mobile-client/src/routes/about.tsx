import {
  getCssVariableValue,
  getCssVariableValueAsNumber,
} from "@/utils/getCssVariableValue";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const sat = getCssVariableValue("--sat");
  const sar = getCssVariableValue("--sar");
  const sab = getCssVariableValue("--sab");
  const sal = getCssVariableValue("--sal");
  const windowVisualHight = window.visualViewport?.height;
  const windowInnerHeight = window.innerHeight;

  return (
    <div className="shadow-dark m-x-4 transition-transform [view-transition-name:main-content]">
      <p>Safe Area Inset Top: {sat}</p>
      <p>Safe Area Inset Right: {sar}</p>
      <p>Safe Area Inset Bottom: {sab}</p>
      <p>Safe Area Inset Left: {sal}</p>
      <p>Window Visual Height: {windowVisualHight}</p>
      <p>Window Inner Height: {windowInnerHeight}</p>
    </div>
  );
}
