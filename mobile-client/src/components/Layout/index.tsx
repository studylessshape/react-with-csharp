import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { platform } from "@tauri-apps/plugin-os";
import { Header } from "./Header";

export interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  /**
   * - `Windows`: 0
   * - `Android`/`IOS`: 40
   */
  topPadding?: number;
  /**
   * - `Windows`: 0
   * - `Android`/`IOS`: 24
   */
  bottomPadding?: number;
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [header, setHeader] = useState(headerRef.current);
  const [content, setContent] = useState(contentRef.current);
  const [footer, setFooter] = useState(footerRef.current);
  const os = platform();
  const paddingTop =
    props.topPadding ?? (os == "android" || os == "ios" ? 40 : 0);
  const paddingBottom =
    props.bottomPadding ?? (os == "android" || os == "ios" ? 24 : 0);

  function setContentSize() {
    if (content) {
      content.style.height = `${window.innerHeight - (header?.offsetHeight ?? 0) - (footer?.offsetHeight ?? 0)}px`;
      content.style.paddingTop = `${header ? 0 : paddingTop}px`;
      content.style.paddingBottom = `${footer ? 0 : paddingBottom}px`;
    }
  }

  function windowSizeChangedHandle(this: Window, evt: UIEvent) {
    setContentSize();
  }

  function elementSizeChangedHandle(this: HTMLElement, evt: UIEvent) {
    setContentSize();
  }

  useEffect(() => {
    window.addEventListener("resize", windowSizeChangedHandle);
    if (header) {
      header.addEventListener("resize", elementSizeChangedHandle);
    }
    if (footer) {
      footer.addEventListener("resize", elementSizeChangedHandle);
    }
    setContentSize();
    setHeader(headerRef.current);
    setContent(contentRef.current);
    setFooter(footerRef.current);
    return () => {
      window.removeEventListener("resize", windowSizeChangedHandle);
      if (header) {
        header.removeEventListener("resize", elementSizeChangedHandle);
      }
      if (footer) {
        footer.removeEventListener("resize", elementSizeChangedHandle);
      }
    };
  }, [headerRef.current, contentRef.current, footerRef.current]);

  return (
    <div className="h-screen w-screen">
      {props.header ? (
        <Header
          ref={headerRef}
          className="w-screen"
          style={{ paddingTop: paddingTop }}
        >
          {props.header}
        </Header>
      ) : undefined}
      <div ref={contentRef} className="overflow-auto">
        {props.children}
      </div>
      {props.footer ? (
        <Header
          ref={footerRef}
          className="w-screen"
          style={{ paddingBottom: paddingBottom }}
        >
          {props.footer}
        </Header>
      ) : undefined}
    </div>
  );
}
