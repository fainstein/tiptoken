"use client";
import { Box, Button, Link, Typography, useMediaQuery } from "@mui/material";
import ConnectWalletButton from "../connect-wallet";
import React from "react";
import NextLink from "next/link";
import { ContainerBox } from "@/ui/components/container-box";
import Image from "next/image";
import CafeCrypto from "../../../public/CafeCrypto.png";
import LocaleSwitcher from "./locale-switcher";
import { useScopedI18n } from "@/locales/client";
import theme from "@/ui/theme/theme";
import MobileMenu from "./mobile-menu";
import { useAccount } from "wagmi";
import { StoredUser } from "@/types/db";
import axios from "axios";
import { BaseResponse, GetUserByAddressResponse } from "@/types/requests";
import { Address, isAddressEqual } from "viem";

const Navigation = () => {
  const [user, setUser] = React.useState<StoredUser | undefined>();
  const t = useScopedI18n("navigation");
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const account = useAccount();
  const previousAddressRef = React.useRef<Address>();

  React.useEffect(() => {
    const fetchUser = async () => {
      if (
        account.isConnected &&
        account.address?.toLowerCase() !==
          previousAddressRef.current?.toLowerCase()
      ) {
        try {
          previousAddressRef.current = account.address;
          const response = await axios<GetUserByAddressResponse>(
            `/api/user/${account.address?.toLowerCase()}`
          );
          if (response.data.status === 404) {
            throw new Error(response.data.message);
          }

          setUser(response.data.user);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchUser();
  }, [account.address, account.isConnected]);

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
            <Link component={NextLink} href={`/user/${user.user_id}`}>
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
