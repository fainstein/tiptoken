"use client";

import { StoredUser } from "@/types/db";
import { trimAddress } from "@/utils/address";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Address } from "viem";
import UpdateUserForm from "./update-user-form";
import { GetUserCampaignsResponse, UpdateUser } from "@/types/requests";
import React from "react";
import useWalletService from "@/hooks/services/useWalletService";
import { StoredCampaign } from "@/types/campaign";
import axios from "axios";
import { useI18n } from "@/locales/client";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import CampaignsList from "./campaigns-list";
import { User } from "@/types/user";

interface DashboardProps {
  updateUserAction: (user: UpdateUser) => Promise<void>;
}

const Dashboard = ({ updateUserAction }: DashboardProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [campaigns, setCampaigns] = React.useState<StoredCampaign[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const isNewUser = !user?.name;
  const walletService = useWalletService();
  const t = useI18n();
  const router = useRouter();
  const snackbar = useSnackbar();

  const logIn = async () => {
    const { signature, message } =
      await walletService.getWalletVerifyingSignature();

    try {
      setIsLoading(true);
      const response = await axios<GetUserCampaignsResponse>(
        "/api/user/authenticate",
        {
          params: {
            signature,
            message: encodeURIComponent(message),
          },
        }
      );
      if (response.data.status === 200) {
        setUser(response.data.user);
        setCampaigns(response.data.campaigns || []);
      } else {
        snackbar.enqueueSnackbar({
          variant: "error",
          message: t("snackbar.no-user-found"),
        });
        router.push("/");
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (!user || isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={3}
        onClick={logIn}
        component={Paper}
        variant="outlined"
      >
        <Button variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={12} /> : t("user.sign.button")}
        </Button>
        <Typography variant="body2">{t("user.sign.reason")}</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={12}>
      <Typography variant="h5" textAlign="right">
        {isNewUser
          ? trimAddress({ address: user?.address as Address, trimSize: 6 })
          : user.name}
      </Typography>
      <Grid container columnSpacing={12}>
        <Grid item xs={12} md={4}>
          <UpdateUserForm
            user={user}
            setUser={setUser}
            updateUser={updateUserAction}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CampaignsList campaigns={campaigns} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
