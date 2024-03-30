import { Box } from "@mui/material";
import { User } from "@/types/user";
import { updateUser } from "@/app/actions/user/updateUser";
import { UpdateUser } from "@/types/requests";
import Dashboard from "./dashboard";

const updateUserAction = async (user: UpdateUser) => {
  "use server";
  try {
    await updateUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(
      "Uh oh! We couldn't update your user information. Please try again"
    );
  }
};

export default async function User() {
  return <Dashboard updateUserAction={updateUserAction} />;
}
