import {
  PropsWithChildren,
  ReactNode,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { platform } from "@tauri-apps/plugin-os";
import { Header } from "./Header";
import { Footer } from "./Footer";

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
  width?: number | string;
  onTouchEnd?: (
    movedX: number,
    movedY: number,
    event: TouchEvent<HTMLDivElement>
  ) => void;
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
    <div
      className={`h-screen${props.width ? "" : " w-screen"}`}
      onTouchEnd={(event) => {
        if (props.onTouchEnd) {
          event.preventDefault();
          const changed = event.changedTouches;
          var movedX = 0;
          var movedY = 0;
          if (changed.length >= 1) {
            var pre = changed[0];

            if (pre) {
              for (let index = 1; index < changed.length; index++) {
                const element = changed[index];
                if (element) {
                  movedX += element.pageX - pre.pageX;
                  movedY += element.pageY - pre.pageY;
                  pre = element;
                }
              }
            }
          }
          props.onTouchEnd(movedX, movedY, event);
        }
      }}
    >
      {props.header ? (
        <Header
          ref={headerRef}
          className={props.width ? undefined : "w-screen"}
          style={{ paddingTop: paddingTop }}
        >
          {props.header}
        </Header>
      ) : undefined}
      <div ref={contentRef} className="overflow-auto">
        {props.children}
      </div>
      {props.footer ? (
        <Footer
          ref={footerRef}
          className={props.width ? undefined : "w-screen"}
          style={{ paddingBottom: paddingBottom }}
        >
          {props.footer}
        </Footer>
      ) : undefined}
    </div>
  );
}
