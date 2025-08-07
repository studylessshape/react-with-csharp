import { withField } from "@douyinfe/semi-ui";
import { IconSelect } from "../IconSelect";

export const FormIconSelect = withField(IconSelect, {
  valueKey: "icon",
  onKeyChangeFnName: "onIconSelected",
});
