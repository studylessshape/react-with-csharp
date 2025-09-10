import { getCssVariableValue } from "@/utils/getCssVariableValue";

export function About() {
  const sat = getCssVariableValue("--sat");
  const sar = getCssVariableValue("--sar");
  const sab = getCssVariableValue("--sab");
  const sal = getCssVariableValue("--sal");
  const windowVisualHight = window.visualViewport?.height;
  const windowInnerHeight = window.innerHeight;

  return (
    <div className="shadow-dark m-x-4 transition-transform">
      <p>Safe Area Inset Top: {sat}</p>
      <p>Safe Area Inset Right: {sar}</p>
      <p>Safe Area Inset Bottom: {sab}</p>
      <p>Safe Area Inset Left: {sal}</p>
      <p>Window Visual Height: {windowVisualHight}</p>
      <p>Window Inner Height: {windowInnerHeight}</p>
    </div>
  );
}
