import { createComponent } from "@lit/react";
import { TopAppBarTitle as _MduiTopAppBarTitle } from "mdui/components/top-app-bar-title.js";
import React from "react";

export const TopAppBarTitle = createComponent({
  react: React,
  tagName: "mdui-top-app-bar-title",
  elementClass: _MduiTopAppBarTitle,
  events: {
    onShow: "show",
    onShown: "shown",
    onHide: "hide",
    onHiden: "hiden",
  },
});
