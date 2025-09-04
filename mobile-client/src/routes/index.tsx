import { CardButton } from "@/components/CardButton";
import {
  Button,
  Card,
  H3,
  Icon,
  Section,
  SectionCard,
} from "@blueprintjs/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="rounded-xl h-[calc(100%-2rem)] w-[calc(100%-1rem)] bg-white shadow-xl p-5 grid grid-cols-4 overflow-y-scroll gap-row-3">
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
        <CardButton icon="document" title="文档"></CardButton>
      </div>
    </div>
  );
}
