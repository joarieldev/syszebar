declare module "culori" {
  export function parse(color: string): { mode: string } | null;
  export function oklch(color: {
    mode: string;
  }): { l?: number; c?: number; h?: number } | null;
}
