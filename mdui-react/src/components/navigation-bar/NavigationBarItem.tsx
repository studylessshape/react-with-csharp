import { createComponent } from "@lit/react";
import { NavigationBarItem as _MduiNavigationBarItem } from "mdui/components/navigation-bar-item.js";
import React from "react";

export const NavigationBarItem = createComponent({
  react: React,
  tagName: "mdui-navigation-bar-item",
  elementClass: _MduiNavigationBarItem,
  events: {
    onFocus: "focus",
    onBlur: "blur",
  },
});
