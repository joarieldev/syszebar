import { createSignal, Show, onCleanup, onMount } from "solid-js";
import { expandWindow, collapseWindow } from "../util/window";
import {
  theme,
  setMode,
  toggleTransparent,
  setAlpha,
  setCustomColor,
} from "../util/theme";
import { MODULES } from "../util/providers";
import { DotsVertical } from "../icons/dots-vertical";
import { module, toggleModule } from "../util/modules";

const PANEL_WIDTH = 288;
const PANEL_HEIGHT = 410;

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
          <div class="space-y-3 text-sm">
            <div class="flex">
              <span>Theme</span>
            </div>

            <div class="flex gap-3">
              {(["dark", "light", "custom"] as const).map((m) => (
                <label class="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="theme-mode"
                    checked={theme.mode === m}
                    onChange={() => setMode(m)}
                    class="accent-line size-3.5"
                  />
                  <span class="capitalize text-xs">{m}</span>
                </label>
              ))}
              <input
                type="color"
                value={theme.customColor}
                onInput={(e) => setCustomColor(e.currentTarget.value)}
                class={`size-5 p-0 border-none cursor-pointer bg-transparent ml-0.5 ${theme.mode !== "custom" ? "opacity-25 pointer-events-none" : ""}`}
              />
            </div>

            <div class="flex justify-between items-center">
              <span>Transparent</span>
              <input
                type="checkbox"
                checked={theme.transparent}
                onChange={toggleTransparent}
                class="accent-line size-3.5 cursor-pointer"
              />
            </div>

            <div
              class={`flex items-center justify-center ${!theme.transparent ? "opacity-25 pointer-events-none" : ""}`}
            >
              <input
                type="range"
                min="0.00"
                max="1"
                step="0.01"
                value={theme.alpha}
                onInput={(e) => setAlpha(Number(e.currentTarget.value))}
                class="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-line"
              />
              <span class="text-content w-12 text-end">
                {Math.round(theme.alpha * 100)}%
              </span>
            </div>

            <span class="block mb-3 border-b border-line/50 pb-2 text-sm font-semibold text-muted">
              Modules
            </span>

            <div class="space-y-1.5">
              {MODULES.map((mod) => (
                <div class="flex justify-between items-center text-xs">
                  <span>{mod.label}</span>
                  <input
                    type="checkbox"
                    checked={module[mod.id]}
                    onChange={() => toggleModule(mod.id)}
                    class="accent-line size-3.5 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
