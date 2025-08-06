import { Button, Popover, Space } from "@douyinfe/semi-ui";
import * as Icon from "@douyinfe/semi-icons/lib/es/icons";
import { useMemo, useState } from "react";
import { SemiIcon } from "../SemiIcon";

export function IconSelect(props: {
  icon?: string;
  showClear?: boolean;
  onIconSelected?: (icon: string | undefined) => void;
}) {
  const [selectedIcon, setSelectedIcon] = useState(props.icon);
  const [isHover, setIsHover] = useState(false);

  function setIcon(icon: string | undefined) {
    setSelectedIcon(icon);
    if (props.onIconSelected) {
      props.onIconSelected(icon);
    }
  }

  return (
    <Popover
      trigger="click"
      clickToHide
      keepDOM
      content={
        <IconPopoverContent
          icon={selectedIcon}
          onIconSelected={(icon) => setIcon(icon)}
        />
      }
    >
      <Button
        type="tertiary"
        className={`${selectedIcon == undefined ? "p-l-7" : ""}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Space>
          <SemiIcon name={selectedIcon} />
          {isHover && props.showClear == true && selectedIcon != undefined ? (
            <Icon.IconClear onClick={() => setIcon(undefined)} />
          ) : (
            <Icon.IconChevronDown />
          )}
        </Space>
      </Button>
    </Popover>
  );
}

function IconPopoverContent(props: {
  icon?: string;
  onIconSelected: (icon: string | undefined) => void;
}) {
  const { icon, onIconSelected } = props;
  const iconList = useMemo(() => Object.keys(Icon), []);
  const iconOptionList = useMemo(() => {
    return iconList.map((key) => (
      <Button
        key={key}
        theme="borderless"
        type={icon == key ? "primary" : "tertiary"}
        icon={<SemiIcon name={key} />}
        onClick={() => onIconSelected(key)}
      />
    ));
  }, [iconList]);
  return (
    <Space className="flex flex-row flex-wrap w-73 h-80 overflow-auto p-2 scrollbar-gutter-stable">
      {iconOptionList}
    </Space>
  );
}
