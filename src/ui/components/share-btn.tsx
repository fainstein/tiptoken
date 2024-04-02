"use client";

import { useI18n } from "@/locales/client";
import { Share } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

const ShareButton = ({ textToCopy }: { textToCopy: string }) => {
  const snackbar = useSnackbar();
  const t = useI18n();

  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy);

    snackbar.enqueueSnackbar({
      variant: "success",
      message: t("snackbar.coppied", { message: textToCopy }),
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <Share />
    </IconButton>
  );
};

export default ShareButton;
