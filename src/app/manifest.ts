import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ragnarok the Board Game – Sound Pad",
    short_name: "RO Sound Pad",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d1020",
    theme_color: "#0d1020",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
