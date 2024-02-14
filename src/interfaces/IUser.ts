import { IUserRole } from "./IUserRole";

export interface IUser {
    id: number;
    email: string;
    address: string;
    userRoles: IUserRole[]
  }
