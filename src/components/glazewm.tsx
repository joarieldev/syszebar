import { createSignal, onCleanup, onMount } from "solid-js";
import type { GlazeWmOutput } from "zebar";

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
    <div class="flex items-center">
      {showLeft() && (
        <button
          class="cursor-pointer text-gray-400 hover:text-white"
          onClick={() => ref?.scrollBy({ left: -80 })}
        >
          ⏴
        </button>
      )}
      <div
        ref={ref}
        onScroll={checkScroll}
        class="flex gap-1 overflow-x-auto max-w-65
      scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {props.glazewm?.currentWorkspaces.map((ws) => (
          <button
            class={`px-1.5 rounded text-sm cursor-pointer text-gray-400 border border-transparent
              ${ws.hasFocus ? "bg-white/20 text-white" : ""}
              ${ws.isDisplayed && !ws.hasFocus ? "border border-white/30" : ""}
              hover:border hover:border-white/30
            `}
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
          class="cursor-pointer text-gray-400 hover:text-white"
          onClick={() => ref?.scrollBy({ left: 80 })}
        >
          ⏵
        </button>
      )}
    </div>
  );
};
