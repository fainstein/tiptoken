import { getUser } from "@/app/api/user/getUser";
import NewUserForm from "../new-user-form";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { User } from "@/types/user";
import { updateUser } from "@/app/api/user/updateUser";
import { UpdateUser } from "@/types/requests";
import { trimAddress } from "@/utils/address";
import { Address } from "viem";
import { getUserCampaigns } from "@/app/api/campaign/getCampaigns";

const updateUserAction = async (user: UpdateUser) => {
  "use server";
  try {
    await updateUser(user);
  } catch (e) {
    console.error(e);
    throw new Error("Uh oh! We couldn't update your user information. Please try again")
  }
};

export default async function User({ params }: { params: { userId: string } }) {
  const user = await getUser(Number(params.userId));

  if (!user.user_id) {
    redirect("/");
  }

  let isNewUser = !user.name;

  const userCampaigns = await getUserCampaigns(user.user_id);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h2">
        Welcome{" "}
        {isNewUser
          ? trimAddress({ address: user.address as Address, trimSize: 6 })
          : user.name}
        !
      </Typography>

      {isNewUser && (
        <NewUserForm userId={user.user_id} updateUser={updateUserAction} />
      )}
      <Typography variant="h2">Your campaigns</Typography>
      {userCampaigns.map((campaign) => (
        <div key={campaign.campaignId}>
          <Typography variant="body1"> Name: {campaign.name}</Typography>
          <Typography variant="body1"> Id: {campaign.campaignId}</Typography>
        </div>
      ))}
    </Box>
  );
}
