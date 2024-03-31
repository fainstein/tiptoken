import { ValidPlatforms } from "@/types/db";
import { Facebook, Instagram, X, YouTube } from "@mui/icons-material";
import { IconProps } from "@mui/material";

export const SocialIcons = {
  [ValidPlatforms.FACEBOOK]: Facebook,
  [ValidPlatforms.INSTAGRAM]: Instagram,
  [ValidPlatforms.X]: X,
  [ValidPlatforms.YOUTUBE]: YouTube,
};
