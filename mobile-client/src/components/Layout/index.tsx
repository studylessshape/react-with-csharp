import {
  Component,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  fullScreen?: boolean;
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  function setContentHeight() {
    if (contentRef.current) {
      const header = headerRef.current;
      const content = contentRef.current;
      const footer = footerRef.current;

      content.style.height = `${window.innerHeight - (header?.clientHeight ?? 0) - (footer?.clientHeight ?? 0)}px`;
    }
  }

  function windowResizeHandle(this: Window, ev: UIEvent) {
    setContentHeight();
  }

  function divResizeHandle(this: HTMLDivElement, ev: UIEvent) {
    setContentHeight();
  }

  useEffect(() => {
    window.addEventListener("resize", windowResizeHandle);
    if (headerRef.current) {
      headerRef.current.addEventListener("resize", divResizeHandle);
    }
    if (footerRef.current) {
      footerRef.current.addEventListener("resize", divResizeHandle);
    }
    setContentHeight();
    return () => {
      window.removeEventListener("resize", windowResizeHandle);
      if (headerRef.current) {
        headerRef.current.removeEventListener("resize", divResizeHandle);
      }
      if (footerRef.current) {
        footerRef.current.removeEventListener("resize", divResizeHandle);
      }
    };
  }, [headerRef.current, contentRef.current, footerRef.current]);

  return (
    <div className={props.fullScreen ? "w-screen h-screen" : undefined}>
      {props.header ? (
        <Header ref={headerRef}>{props.header}</Header>
      ) : undefined}
      <div ref={contentRef} className="max-w-screen overflow-auto">
        {props.children}
      </div>
      {props.footer ? (
        <Footer ref={footerRef}>{props.footer}</Footer>
      ) : undefined}
    </div>
  );
}
