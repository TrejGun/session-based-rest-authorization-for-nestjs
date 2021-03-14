import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class FacebookGuard extends AuthGuard("facebook") implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }

  public handleRequest<UserEntity>(e: Error, userEntity: UserEntity): UserEntity {
    if (e) {
      throw new UnauthorizedException(e.message);
    }

    return userEntity;
  }
}
