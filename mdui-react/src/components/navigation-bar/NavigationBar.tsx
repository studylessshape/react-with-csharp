import { createComponent } from "@lit/react";
import { NavigationBar as _MduiNavigationBar } from "mdui/components/navigation-bar.js";
import React from "react";
export type NavigationBarType = _MduiNavigationBar;
export const NavigationBar = createComponent({
  react: React,
  tagName: "mdui-navigation-bar",
  elementClass: _MduiNavigationBar,
  events: {
    onChange: "change",
    onShow: "show",
    onShown: "shown",
    onHide: "hide",
    onHidden: "hidden",
  },
});
