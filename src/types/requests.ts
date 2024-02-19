import { User } from "./user";

export type UpdateUser = Omit<User, "address">;
