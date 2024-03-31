"use client";

import React from "react";
import { UpdateUser } from "@/types/requests";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useScopedI18n } from "@/locales/client";
import { ValidPlatforms } from "@/types/db";
import { Person } from "@mui/icons-material";
import { SocialIcons } from "@/ui/components/social-logo";
import { User, UserSocial } from "@/types/user";

interface UpdateUserFormProps {
  user: User;
  updateUser: (user: UpdateUser) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UpdateUserForm = ({ user, updateUser, setUser }: UpdateUserFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const snackbar = useSnackbar();
  const t = useScopedI18n("user");

  const handleUpdateUser = async () => {
    if (!user.name) {
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({
        user_id: user.user_id,
        name: user.name,
        socialLinks: user.socialLinks,
      });
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      snackbar.enqueueSnackbar({
        variant: "error",
        message: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" display="flex" flexDirection="column" gap={3}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h5">{t("personal-info")}</Typography>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Person />
        <TextField
          id="userName"
          placeholder={t("personal.name.placeholder")}
          value={user.name}
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onChange={(e) =>
            setUser((prev) => prev && { ...prev, name: e.target.value })
          }
          disabled={!isEditing}
        />
      </Box>
      {Object.entries(SocialIcons).map(([platform, SocialIcon]) => (
        <Box display="flex" gap={2} alignItems="center" key={platform}>
          <SocialIcon />
          <TextField
            id={`social-${platform}`}
            placeholder={`${capitalize(platform)} link`}
            value={user.socialLinks?.[platform as ValidPlatforms] || ""}
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onChange={(e) =>
              setUser(
                (prev) =>
                  prev && {
                    ...prev,
                    socialLinks: {
                      ...prev.socialLinks,
                      [platform as ValidPlatforms]: e.target.value,
                    },
                  }
              )
            }
            disabled={!isEditing || !user.name}
          />
        </Box>
      ))}
      {isEditing ? (
        <Button
          variant="contained"
          size="large"
          onClick={handleUpdateUser}
          disabled={isLoading || !user.name}
        >
          {isLoading ? <CircularProgress /> : t("personal.save")}
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="large"
          onClick={() => setIsEditing(true)}
        >
          {t("personal.edit")}
        </Button>
      )}
    </Box>
  );
};

export default UpdateUserForm;
