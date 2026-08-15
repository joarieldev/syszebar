import type { MediaOutput } from "zebar";
import { PlayerPlay } from "../icons/player-play";
import { PlayerPause } from "../icons/player-pause";
import { PlayerTrackPrev } from "../icons/player-track-prev";
import { PlayerTrackNext } from "../icons/player-track-next";
import { moduleColors } from "../util/module-colors";
import { displayMode } from "../util/module-display";
import { Vinyl } from "../icons/vinyl";

interface Props {
  media: MediaOutput | null;
}

export const Media = (props: Props) => {
  const session = () => props.media?.currentSession ?? null;
  const label = () => session() ? [session()?.title, session()?.artist].filter(Boolean).join(" - ") : "---";

  return (
    <div class="flex items-center justify-center gap-1.5 px-2">
      <span
        class="flex justify-center items-center text-icon leading-none"
        style={{ color: moduleColors.media || undefined }}
      >
        <Vinyl
          class={`${displayMode() === "icon" ? "size-icon" : "size-4"}`}
          isPlaying={session()?.isPlaying}
        />
      </span>

      <span
        title={label()}
        class="tabular-nums whitespace-nowrap text-end leading-none max-w-40 truncate"
      >
        {label()}
      </span>

      <span
        class="flex items-center gap-1"
        classList={{ "opacity-40 pointer-events-none": !session() }}
      >
        <button
          onClick={() => props.media?.previous()}
          title="Previous"
          class="flex justify-center items-center cursor-pointer text-muted hover:text-content"
        >
          <PlayerTrackPrev class="size-3.5" />
        </button>
        <button
          onClick={() => props.media?.togglePlayPause()}
          title={session()?.isPlaying ? "Pause" : "Play"}
          class="flex justify-center items-center cursor-pointer text-muted hover:text-content"
        >
          {session()?.isPlaying ? <PlayerPause class="size-3.5" /> : <PlayerPlay class="size-3.5" />}
        </button>
        <button
          onClick={() => props.media?.next()}
          title="Next"
          class="flex justify-center items-center cursor-pointer text-muted hover:text-content"
        >
          <PlayerTrackNext class="size-3.5" />
        </button>
      </span>
    </div>
  );
};
