import { Box, Typography } from "@mui/material";
import CreateCampaignForm from "./create-campaign-form";

export default function Create() {
  return (
    <Box display="flex" gap={12} flexDirection="column">
      <Typography variant="h3">Create campaign</Typography>
      <CreateCampaignForm />
    </Box>
  );
}
