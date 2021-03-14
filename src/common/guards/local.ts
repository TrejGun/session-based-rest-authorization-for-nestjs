import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class LocalGuard extends AuthGuard("local") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean {
    const isPublicHandler = this.reflector.get<boolean>("isPublic", context.getHandler());
    const isPublicClass = this.reflector.get<boolean>("isPublic", context.getClass());

    if (isPublicHandler || isPublicClass) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const isAuthenticated: boolean = request.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
