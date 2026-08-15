interface Props {
  class?: string;
  isPlaying?: boolean;
}

export const Vinyl = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      class={props.class}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path class={`${props.isPlaying ? "animate-spin origin-center transform-fill [animation-duration:3s]" : ""}`} d="M16 3.937A9 9 0 1 0 21 12" />
      <path d="M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M19 4a1 1 0 1 0 2 0 1 1 0 1 0-2 0" />
      <path d="m20 4-3.5 10-2.5 2" />
    </svg>
  );
};
