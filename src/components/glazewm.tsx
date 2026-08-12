import { createSignal, onCleanup, onMount } from "solid-js";
import type { GlazeWmOutput } from "zebar";
import { barStyle } from "../util/bar-style";
import { barBorders } from "../util/bar-border";

interface Props {
  glazewm: GlazeWmOutput | null;
}

export const Glazewm = (props: Props) => {
  let ref: HTMLDivElement | undefined;
  const [showLeft, setShowLeft] = createSignal(false);
  const [showRight, setShowRight] = createSignal(true);

  const checkScroll = () => {
    if (!ref) return;
    setShowLeft(ref.scrollLeft > 0);
    setShowRight(ref.scrollLeft + ref.clientWidth < ref.scrollWidth - 1);
  };

  const wsBtnClasses = (ws: { hasFocus: boolean; isDisplayed: boolean }) => {
    const base = "px-1.5 flex items-center justify-center cursor-pointer hover:text-content";
    const text = ws.hasFocus || ws.isDisplayed ? "text-content" : "text-muted";

    if (barStyle.value !== "modular")
      return `${base} ${text}`;

    const border = ws.hasFocus ? "border-ws-line" : "border-line";

    return `${base} ${text} bg-surface border ${border} hover:border-ws-line min-w-7 max-w-7`;
  };

  const wsBorderStyle = () => {
    if (barStyle.value !== "modular") return {};
    const b = barBorders[barStyle.value];
    return {
      "border-width": `${b.width}px`,
      "border-radius": `${b.radius}px`,
    };
  }

  onMount(() => {
    const el = ref;
    if (!el) return;
    checkScroll();

    const handler = (e: WheelEvent) => {
      if (el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        checkScroll();
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    onCleanup(() => el.removeEventListener("wheel", handler));
  });

  return (
    <div class="flex h-full items-center max-w-65">
      {showLeft() && (
        <button
          class="cursor-pointer text-muted hover:text-content"
          onClick={() => ref?.scrollBy({ left: -80 })}
        >
          ⏴
        </button>
      )}
      <div
        ref={ref}
        onScroll={checkScroll}
        class="flex gap-1 overflow-x-auto h-full scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {props.glazewm?.currentWorkspaces.map((ws) => (
          <button
            class={wsBtnClasses(ws)}
            style={wsBorderStyle()}
            onClick={() =>
              props.glazewm?.runCommand(`focus --workspace ${ws.name}`)
            }
          >
            {ws.displayName ?? ws.name}
          </button>
        ))}
      </div>
      {showRight() && (
        <button
          class="cursor-pointer text-muted hover:text-content"
          onClick={() => ref?.scrollBy({ left: 80 })}
        >
          ⏵
        </button>
      )}
    </div>
  );
};
