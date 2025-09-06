import { createComponent } from "@lit/react";
import { TopAppBar as _MduiTopAppBar } from "mdui/components/top-app-bar.js";
import React from "react";

export const TopAppBar = createComponent({
  react: React,
  tagName: "mdui-top-app-bar",
  elementClass: _MduiTopAppBar,
  events: {
    onShow: "show",
    onShown: "shown",
    onHide: "hide",
    onHiden: "hiden",
  },
});
