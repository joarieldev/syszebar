import { createStore } from "solid-js/store";

const STORAGE_KEY = "syszebar-theme";

const stored = localStorage.getItem(STORAGE_KEY);
const initial: "dark" | "light" = stored === "dark" || stored === "light" ? stored : "dark";

export const [theme, setTheme] = createStore<{ mode: "dark" | "light" }>({ mode: initial });

export function toggleTheme() {
  const next = theme.mode === "dark" ? "light" : "dark";
  setTheme("mode", next);
  localStorage.setItem(STORAGE_KEY, next);
}

window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY && (e.newValue === "dark" || e.newValue === "light")) {
    setTheme("mode", e.newValue);
  }
});
