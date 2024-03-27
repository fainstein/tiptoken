"use client";
import { Box, Button, Link, Typography, useMediaQuery } from "@mui/material";
import ConnectWalletButton from "../connect-wallet";
import React from "react";
import NextLink from "next/link";
import { ContainerBox } from "@/ui/components/container-box";
import Image from "next/image";
import CafeCrypto from "../../../public/CafeCrypto.png";
import LocaleSwitcher from "./locale-switcher";
import { useI18n, useScopedI18n } from "@/locales/client";
import theme from "@/ui/theme/theme";
import MobileMenu from "./mobile-menu";
import { useAccount } from "wagmi";
import { StoredUser } from "@/types/db";

const Navigation = () => {
  const [user, setUser] = React.useState<StoredUser | undefined>();
  const t = useScopedI18n("navigation");
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const account = useAccount();

  React.useEffect(() => {
    const fetchUser = async () => {
      if (account.address) {
        try {
          const response = await fetch(`/api/user/${account.address}`);
          const data = await response.json();

          if (data.status === 404) {
            throw new Error(data.message);
          }

          setUser(data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchUser();
  }, [account.address]);

  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={6}
    >
      <Link href="/" component={NextLink}>
        <Box display="flex" gap={2} alignItems="center">
          <Image
            width={40}
            height={40}
            src={CafeCrypto}
            alt="cafe-crypto-logo"
          />
          <Typography variant="h4" display={mobile ? "none" : ""}>
            CafeCrypto
          </Typography>
        </Box>
      </Link>
      {mobile ? (
        <MobileMenu user={user} />
      ) : (
        <ContainerBox alignItems="center" gap={6}>
          <Button variant="contained" href="/create" LinkComponent={NextLink}>
            {t("create")}
          </Button>
          {user && (
            <Link component={NextLink} href={`/users/${user.user_id}`}>
              <Typography variant="body1">{t("profile")}</Typography>
            </Link>
          )}
          <ConnectWalletButton />
          <LocaleSwitcher />
        </ContainerBox>
      )}
    </Box>
  );
};

export default Navigation;
