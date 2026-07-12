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
import {
  typography,
  setFontSize,
  setFontFamily,
  setTextColor,
  resetTextColor,
  FALLBACK_FONTS,
} from "../util/typography";
import { barStyle, setStyle } from "../util/bar-style";
import type { BarStyle } from "../util/bar-style";

const PANEL_WIDTH = 340;
const PANEL_HEIGHT = 450;

export function Settings() {
  const [opened, setOpened] = createSignal(false);
  const [fontOpen, setFontOpen] = createSignal(false);
  let wrapperRef: HTMLDivElement | undefined;
  let fontMenuRef: HTMLDivElement | undefined;
  let fontTriggerRef: HTMLInputElement | undefined;

  async function close() {
    await collapseWindow();
    setOpened(false);
  }

  async function toggle() {
    if (opened()) {
      await close();
    } else {
      await expandWindow(PANEL_HEIGHT + 10); // 10px for the top-[calc(100%+10px)]
      setOpened(true);
    }
  }

  async function onClickOutside(e: MouseEvent) {
    if (wrapperRef && !wrapperRef.contains(e.target as Node)) {
      await close();
    }
  }

  function onFontClickOutside(e: MouseEvent) {
    if (
      fontOpen() &&
      fontMenuRef &&
      fontTriggerRef &&
      !fontMenuRef.contains(e.target as Node) &&
      !fontTriggerRef.contains(e.target as Node)
    ) {
      setFontOpen(false);
    }
  }

  onMount(async () => {
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("mousedown", onFontClickOutside);
    window.addEventListener("blur", close);
    onCleanup(() => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("mousedown", onFontClickOutside);
      window.removeEventListener("blur", close);
    });
  });

  function selectFont(family: string) {
    setFontFamily(family);
    setFontOpen(false);
  }

  function handleCustomFontInput(e: Event) {
    setFontFamily((e.target as HTMLInputElement).value);
  }

  return (
    <div ref={wrapperRef} class="flex justify-center items-center">
      <button
        onClick={toggle}
        class="flex justify-center text-icon cursor-pointer px-2"
      >
        <DotsVertical class="size-4" />
      </button>

      <Show when={opened()}>
        <div
          style={{ width: `${PANEL_WIDTH}px`, height: `${PANEL_HEIGHT}px` }}
          class={`absolute right-0 top-[calc(100%+10px)] flex z-50 ${barStyle.value === "full" ? "right-2.5" : ""}`}
        >
          <div class="rounded-lg border border-line bg-surface text-content p-4 overflow-y-auto size-full">
            <span class="block mb-1 border-b border-line/50 pb-1 text-sm font-semibold text-muted text-center">
              Settings
            </span>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between items-center gap-4">
                <span>Theme</span>
                <div class="flex gap-2">
                  {(["dark", "light", "custom"] as const).map((m) => (
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        name="theme-mode"
                        checked={theme.mode === m}
                        onChange={() => setMode(m)}
                        class="accent-line size-3.5"
                      />
                      <span class="capitalize cursor-pointer">{m}</span>
                      {m === "custom" && (
                        <input
                          type="color"
                          value={theme.customColor}
                          onInput={(e) => setCustomColor(e.currentTarget.value)}
                          class={`size-5 p-0 border-none bg-transparent ${theme.mode !== "custom" ? "pointer-events-none cursor-default" : "cursor-pointer"}`}
                        />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div class="flex justify-between items-center gap-4">
                <span>Transparent</span>
                <div class="flex items-center justify-center gap-2">
                  <input
                    type="checkbox"
                    checked={theme.transparent}
                    onChange={toggleTransparent}
                    class="accent-line size-3.5 cursor-pointer"
                  />
                  <div
                    class={`flex items-center justify-center gap-2 ${!theme.transparent ? "opacity-25 pointer-events-none" : ""}`}
                  >
                    <input
                      type="range"
                      min="0.00"
                      max="1"
                      step="0.01"
                      value={theme.alpha}
                      onInput={(e) => setAlpha(Number(e.currentTarget.value))}
                      class="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer accent-line"
                    />
                    <span class="text-content w-10 text-end">
                      {Math.round(theme.alpha * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex justify-between items-center gap-4">
                <span>Style</span>
                <div class="flex gap-2 text-xs">
                  {(["default", "full", "modular"] as BarStyle[]).map((s) => (
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        name="bar-style"
                        checked={barStyle.value === s}
                        onChange={() => setStyle(s)}
                        class="accent-line size-3.5"
                      />
                      <span class="capitalize cursor-pointer">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <span class="block mb-1 border-b border-line/50 py-1 text-sm font-semibold text-muted text-center">
              Typography
            </span>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between items-center gap-4">
                <span>Font family</span>
                <div class="flex relative max-w-36">
                  <input
                    type="text"
                    ref={fontTriggerRef}
                    onClick={() => setFontOpen(!fontOpen())}
                    value={typography.fontFamily}
                    onInput={handleCustomFontInput}
                    placeholder="e.g. Inter, sans-serif"
                    class="w-full text-right bg-transparent outline-none focus:ring-1 focus:ring-line border border-line rounded px-1 py-0.5"
                  />
                  <Show when={fontOpen()}>
                    <div
                      ref={fontMenuRef}
                      class="absolute left-0 right-0 top-full mt-1 z-60 bg-surface border border-line rounded shadow-lg max-h-36 overflow-y-auto backdrop-blur"
                    >
                      {FALLBACK_FONTS.map((f) => (
                        <button
                          onClick={() => selectFont(f.family)}
                          class={`w-full text-right px-1 py-0.5 text-xs cursor-pointer hover:bg-line truncate ${typography.fontFamily === f.family ? "underline underline-offset-2" : ""}`}
                          style={{ "font-family": f.family }}
                        >
                          {f.family}
                        </button>
                      ))}
                    </div>
                  </Show>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <span>Font size</span>
                <div class="flex items-center gap-1">
                  <input
                    type="number"
                    min={8}
                    max={32}
                    step={1}
                    value={typography.fontSize}
                    onInput={(e) => setFontSize(Number(e.currentTarget.value))}
                    class="w-12 text-right bg-transparent outline-none focus:ring-1 focus:ring-line border border-line rounded px-1 py-0.5"
                  />
                  <span class="text-content">px</span>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <span>Text color</span>
                <div class="flex items-center gap-1">
                  <input
                    type="color"
                    value={typography.textColor || "#ffffff"}
                    onInput={(e) => setTextColor(e.currentTarget.value)}
                    class="size-5 p-0 border-none cursor-pointer bg-transparent"
                  />
                  <button
                    onClick={resetTextColor}
                    class="text-muted hover:text-content cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <span class="block mb-1 border-b border-line/50 py-1 text-sm font-semibold text-muted text-center">
              Modules
            </span>

            <div class="space-y-2 text-xs">
              {MODULES.map((mod) => (
                <div class="flex justify-between items-center gap-4">
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
