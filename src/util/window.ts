import { getCurrentWindow } from "@tauri-apps/api/window";
import { LogicalSize, LogicalPosition } from "@tauri-apps/api/dpi";

let tauriWindow: ReturnType<typeof getCurrentWindow> | null = null;
let presetSize: { width: number; height: number } | null = null;
let presetPos: { x: number; y: number } | null = null;

const ready = (async () => {
  const win = getCurrentWindow();
  const [size, pos] = await Promise.all([win.outerSize(), win.outerPosition()]);
  const scale = window.devicePixelRatio;
  presetSize = size.toLogical(scale);
  presetPos = pos.toLogical(scale);
  tauriWindow = win;
})().catch(() => {
  console.log("[syszebar] Tauri API not available (dev mode)");
});

export async function expandWindow(panelHeight: number) {
  await ready;
  if (!tauriWindow || !presetSize || !presetPos) return;

  await tauriWindow.setSize(
    new LogicalSize(presetSize.width, presetSize.height + panelHeight)
  );
}

export async function collapseWindow() {
  await ready;
  if (!tauriWindow || !presetSize || !presetPos) return;
  await tauriWindow.setSize(new LogicalSize(presetSize.width, presetSize.height));
  await tauriWindow.setPosition(new LogicalPosition(presetPos.x, presetPos.y));
}
