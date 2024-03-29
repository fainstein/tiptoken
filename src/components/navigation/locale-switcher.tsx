"use client";
import { locales } from "@/middleware";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { Box, MenuItem, Select } from "@mui/material";

interface LocaleSwitcherProps {
  onClose?: () => void;
}

const LocaleSwitch = ({}: LocaleSwitcherProps) => {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return (
    <Select
      variant="standard"
      disableUnderline
      value={locale}
      onChange={(value) => changeLocale(value.target.value as any)}
    >
      {locales.map((lang) => (
        <MenuItem key={lang} value={lang}>
          {lang.toUpperCase()}
        </MenuItem>
      ))}
      {locale}
    </Select>
  );
};

export default LocaleSwitch;
