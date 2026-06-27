import { createSignal, Show, onCleanup, onMount } from "solid-js";
import { expandWindow, collapseWindow } from "../util/window";
import { theme, toggleTheme, toggleTransparent } from "../util/theme";
import { DotsVertical } from "../icons/dots-vertical";

const PANEL_WIDTH = 288;
const PANEL_HEIGHT = 200;

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
      await expandWindow(PANEL_HEIGHT);
      setOpened(true);
    }
  }

  async function onClickOutside(e: MouseEvent) {
    if (wrapperRef && !wrapperRef.contains(e.target as Node)) {
      await close();
    }
  }

  onMount(() => {
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("blur", close);
    onCleanup(() => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("blur", close);
    });
  });

  return (
    <div ref={wrapperRef} class="flex justify-center items-center px-2">
      <button
        onClick={toggle}
        class="flex justify-center text-icon hover:text-content cursor-pointer"
      >
        <DotsVertical class="size-4" />
      </button>

      <Show when={opened()}>
        <div
          style={{ width: `${PANEL_WIDTH}px`, height: `${PANEL_HEIGHT}px` }}
          class="absolute right-0 top-full mt-2.5 rounded-lg border border-line bg-surface text-content shadow-lg p-4 z-50 overflow-y-auto"
        >
          <span class="block mb-3 border-b border-line/50 pb-2 text-sm font-semibold text-muted">
            Settings
          </span>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-center">
              <span>Theme</span>
              <button
                onClick={toggleTheme}
                class="text-muted hover:text-content transition-colors cursor-pointer"
              >
                {theme.mode === "dark" ? "Dark" : "Light"}
              </button>
            </div>
            <div class="flex justify-between items-center">
              <span>Transparent</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={theme.transparent}
                  onChange={toggleTransparent}
                  class="sr-only peer"
                />
                <div class="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-content transition-colors" />
                <div class="absolute left-0.5 top-0.5 size-4 bg-surface rounded-full peer-checked:translate-x-4 transition-transform" />
              </label>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
