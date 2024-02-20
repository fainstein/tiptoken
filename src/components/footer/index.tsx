import { GitHub, X } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box
      component="footer"
      width="100%"
      display="flex"
      gap={2}
      justifyContent="center"
    >
      <IconButton
        LinkComponent={NextLink}
        href="https://github.com/fainstein/tiptoken"
        aria-label="github.com"
        target="_blank"
      >
        <GitHub />
      </IconButton>
      <IconButton
        LinkComponent={NextLink}
        href="https://twitter.com/nfainstein"
        aria-label="twitter.com"
        target="_blank"
      >
        <X />
      </IconButton>
    </Box>
  );
};

export default Footer;
