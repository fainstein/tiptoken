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

interface NewUserFormProps {
  userId: number;
  updateUser: (user: UpdateUser) => Promise<void>;
}

const NewUserForm = ({ userId, updateUser }: NewUserFormProps) => {
  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const snackbar = useSnackbar();

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
      <Typography variant="h4">Let people know more about yourself</Typography>
      <TextField
        id="userName"
        placeholder="How do people call you?"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleUpdateUser}
        disabled={isLoading || !name}
      >
        {isLoading ? <CircularProgress /> : "Update your information"}
      </Button>
    </Box>
  );
};

export default NewUserForm;
