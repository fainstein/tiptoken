import { Components } from "@mui/material";
import theme from "../theme";

export const components: Components = {
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        padding: "32px",
        borderRadius: "12px",
      },
    },
  },
};
