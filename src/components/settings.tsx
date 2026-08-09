import { createSignal, Show, onCleanup, onMount } from "solid-js";
import { expandWindow, collapseWindow } from "../util/window";
import { DotsVertical } from "../icons/dots-vertical";
import { Panel } from "./window/panel";

const PANEL_WIDTH = 340;
const PANEL_HEIGHT = 610;

export function Settings() {
  const [opened, setOpened] = createSignal(false);
  let wrapperRef: HTMLDivElement | undefined;

  async function close() {
    await collapseWindow();
    setOpened(false);
  }

  async function toggle() {
    if (opened()) {
      await close();
    } else {
      await expandWindow(PANEL_HEIGHT + 10); // 10px for the <Panel/> top-[calc(100%+10px)]
      setOpened(true);
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
      >
        <DotsVertical class="size-icon" />
      </button>

      <Show when={opened()}>
        <Panel width={PANEL_WIDTH} height={PANEL_HEIGHT} />
      </Show>
    </div>
  );
}
