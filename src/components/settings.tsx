import { createSignal, Show, onCleanup, onMount } from "solid-js";
import { expandWindow, collapseWindow } from "../util/window";
import { DotsVertical } from "../icons/dots-vertical";
import { Panel } from "./window/panel";
import type { ColumnId } from "../util/module-containers";
import { moduleColors } from "../util/module-colors";

const PANEL_WIDTH = 340;
const PANEL_HEIGHT = 610;

const PANEL_POSITIONS: Record<ColumnId, string> = {
  left: "left-2.5",
  center: "left-1/2 -translate-x-1/2",
  right: "right-2.5",
};

interface Props {
  column: ColumnId;
}

export const [settingsOpen, setSettingsOpen] = createSignal(false);

export function Settings(props: Props) {
  let wrapperRef: HTMLDivElement | undefined;

  async function close() {
    await collapseWindow();
    setSettingsOpen(false);
  }

  async function toggle() {
    if (settingsOpen()) {
      await close();
    } else {
      await expandWindow(PANEL_HEIGHT + 10); // 10px for the <Panel/> top-[calc(100%+10px)]
      setSettingsOpen(true);
    }
  }

  async function onClickOutside(e: MouseEvent) {
    if (wrapperRef && !wrapperRef.contains(e.target as Node)) {
      await close();
    }
  }

  onMount(async () => {
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("blur", close);
    onCleanup(() => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("blur", close);
    });
  });

  return (
    <div ref={wrapperRef} class="flex justify-center items-center">
      <button
        onClick={toggle}
        class="flex justify-center text-icon cursor-pointer px-1.5"
        style={{ color: moduleColors.settings || undefined }}
      >
        <DotsVertical class="size-4" />
      </button>

      <Show when={settingsOpen()}>
        <Panel width={PANEL_WIDTH} height={PANEL_HEIGHT} positionClass={PANEL_POSITIONS[props.column]} />
      </Show>
    </div>
  );
}
