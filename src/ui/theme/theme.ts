"use client";
import { createTheme } from "@mui/material/styles";
import { palette } from "./components/palette";

import { Poppins } from "next/font/google";
import { components } from "./components/components";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  palette,
  spacing: 4,
  components: components,
});

export default theme;
