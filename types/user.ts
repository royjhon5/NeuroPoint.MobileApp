export type Role = "admin" | "doctor" | "staff" | "accountant";

export interface User {
  username: string;
  password: string;
  role: Role;
}
