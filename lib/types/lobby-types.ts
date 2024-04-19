import type { User } from "./auth-types";

export type Lobby = {
  id: number;
  admin_user_id: number;
  name: string;
  status: string;
  users: User[];
  races: any[];
};
