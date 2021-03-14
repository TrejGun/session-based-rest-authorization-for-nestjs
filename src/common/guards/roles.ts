import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";

import {UserRole} from "../../user/interfaces";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesForHandler = this.reflector.get<Array<UserRole>>("roles", context.getHandler());
    const rolesForClass = this.reflector.get<Array<UserRole>>("roles", context.getClass());

    const roles = ([] as Array<UserRole>).concat(rolesForHandler, rolesForClass).filter(e => e);

    if (!roles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    return request.user.userRoles.some((role: UserRole) => !!roles.find(item => item === role)) as boolean;
  }
}
