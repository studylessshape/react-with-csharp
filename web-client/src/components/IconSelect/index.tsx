import { Button, Popover, Space, Tooltip, Typography } from "@douyinfe/semi-ui";
import * as Icon from "@douyinfe/semi-icons/lib/es/icons";
import { useEffect, useState, type CSSProperties } from "react";
import { SemiIcon } from "../SemiIcon";

export function IconSelect(props: {
  icon?: string;
  showClear?: boolean;
  maxWidth?: number;
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

  useEffect(() => {
    setIcon(props.icon);
  }, [props.icon]);

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
        style={{ maxWidth: props.maxWidth }}
        className={`overflow-hidden ${selectedIcon == undefined ? "p-l-20" : ""}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Space>
          <Space>
            <SemiIcon name={selectedIcon} />
            <Typography.Text
              className="overflow-hidden text-ellipsis"
              style={{
                maxWidth: props.maxWidth ? props.maxWidth - 70 : undefined,
              }}
            >
              {selectedIcon}
            </Typography.Text>
          </Space>
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
  const iconList = Object.keys(Icon);
  return (
    <Space className="flex flex-row flex-wrap w-73 h-80 overflow-auto p-y-2 p-l-2 scrollbar-gutter-stable">
      {iconList.map((key) => (
        <Button
          key={key}
          theme="borderless"
          className="border border-solid semi-border-color"
          type={icon == key ? "primary" : "tertiary"}
          icon={<SemiIcon name={key} />}
          onClick={() => onIconSelected(key)}
        />
      ))}
    </Space>
  );
}
