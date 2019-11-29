import {UserRole} from "./roles";


export interface IUser {
  id: number;
  email: string;
  roles: UserRole[];
}
