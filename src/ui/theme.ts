"use client";
import { createTheme } from "@mui/material/styles";

import { Roboto } from "next/font/google";
import { components } from "./components";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  spacing: 4,
  components: components,
});

export default theme;
