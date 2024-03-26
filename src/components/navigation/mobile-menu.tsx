"use client";
import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Link, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useAccount, useDisconnect, useReconnect } from "wagmi";
import { useScopedI18n } from "@/locales/client";
import { StoredUser } from "@/types/db";
import NextLink from "next/link";
import LocaleSwitch from "./locale-switcher";
import ConnectWalletButton from "../connect-wallet";

const MobileMenu = ({ user }: { user?: StoredUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const t = useScopedI18n("navigation");
  const account = useAccount();
  const { disconnect } = useDisconnect();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    handleClose();
    disconnect();
  };

  return (
    <div>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem LinkComponent={Link}>
          <Link href="/create">
            <Typography variant="body1">{t("create")}</Typography>
          </Link>
        </MenuItem>
        {user && (
          <MenuItem LinkComponent={Link}>
            <Link href={`/users/${user.user_id}`}>
              <Typography variant="body1">{t("profile")}</Typography>
            </Link>
          </MenuItem>
        )}
        {account.isConnected ? (
          <MenuItem onClick={handleDisconnect}>
            <Typography variant="body1">{t("disconnect")}</Typography>
          </MenuItem>
        ) : (
          <MenuItem>
            <ConnectWalletButton />
          </MenuItem>
        )}
        <MenuItem disableTouchRipple>
          <LocaleSwitch onClose={handleClose} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileMenu;
