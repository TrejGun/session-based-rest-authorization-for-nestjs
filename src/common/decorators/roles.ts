import {SetMetadata} from "@nestjs/common";
import {UserRole} from "../../user/interfaces";


export const Roles = (...roles: Array<UserRole>): ((target: object, key?: any, descriptor?: any) => any) =>
  SetMetadata("roles", [...roles]);
