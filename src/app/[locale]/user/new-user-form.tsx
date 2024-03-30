"use client";

import React from "react";
import { UpdateUser } from "@/types/requests";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useScopedI18n } from "@/locales/client";

interface NewUserFormProps {
  userId: number;
  updateUser: (user: UpdateUser) => Promise<void>;
}

const NewUserForm = ({ userId, updateUser }: NewUserFormProps) => {
  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const snackbar = useSnackbar();
  const t = useScopedI18n("user");

  if (success) {
    return;
  }

  const handleUpdateUser = async () => {
    if (!name) {
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({ user_id: userId, name });
    } catch (e) {
      console.error(e);
      snackbar.enqueueSnackbar({
        variant: "error",
        message: (e as Error).message,
      });
    }
    setSuccess(true);
    setIsLoading(false);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth="sm"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h5" textAlign="center">
          {t("personal-info")}
        </Typography>
        <Typography variant="body2">{t("personal-info-reason")}</Typography>
      </Box>
      <TextField
        id="userName"
        placeholder={t("personal.name.placeholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleUpdateUser}
        disabled={isLoading || !name}
      >
        {isLoading ? <CircularProgress /> : t("personal.submit")}
      </Button>
    </Box>
  );
};

export default NewUserForm;
