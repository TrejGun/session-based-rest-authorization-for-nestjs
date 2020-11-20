import {Request} from "express";
import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {IUser, UserRole} from "../../user/interfaces";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>("roles", context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    return (request.user as IUser).roles.some((role: UserRole) => !!roles.find(item => item === role));
  }
}
