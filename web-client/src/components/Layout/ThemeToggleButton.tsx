import { IconMoon, IconSun } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { useThemeState } from "../../stores";

export function ThemeToggleButton() {
  const currentTheme = useThemeState((state) => state.mode);
  const setTheme = useThemeState((state) => state.setMode);

  return (
    <Button
      icon={
        currentTheme == "light" ? (
          <IconSun size="large" />
        ) : (
          <IconMoon size="large" />
        )
      }
      onClick={() => {
        if (currentTheme == "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
      theme="borderless"
      type="tertiary"
    ></Button>
  );
}
