import { Button, Icon, MaybeElement } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { MouseEvent, PropsWithChildren, ReactNode } from "react";

export interface CardButtonProps {
  icon?: ReactNode;
  title?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => any;
}
export function CardButton(props: CardButtonProps) {
  return (
    <div className="shadow-blue shadow-sm border-1 border-solid border-gray border-opacity-50 w-fit h-fit rounded-xl p-2">
      <Button variant="minimal">
        <div className="flex flex-col items-center">
          <div className="text-size-md">{props.title}</div>
        </div>
      </Button>
    </div>
  );
}
