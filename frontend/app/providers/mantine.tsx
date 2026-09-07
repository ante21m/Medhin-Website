"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "medhin",
  colors: {
    medhin: [
      "#EFF7FC",
      "#DCEBF6",
      "#B8D8EC",
      "#8FC3E0",
      "#5AA6CC",
      "#2E87B8",
      "#146DA5",
      "#0F5A86",
      "#0C405F",
      "#0B4A7C",
    ],
  },
  fontFamily: "Inter, system-ui, sans-serif",
  headings: { fontFamily: "var(--font-display), Georgia, serif", fontWeight: "500" },
  defaultRadius: "md",
});

export default function MantineProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
