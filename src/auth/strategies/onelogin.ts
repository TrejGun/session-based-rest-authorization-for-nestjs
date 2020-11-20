import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, Client, UserinfoResponse, TokenSet} from "openid-client";

import {UserService} from "../../user/user.service";
import {UserEntity} from "../../user/user.entity";

@Injectable()
export class OneloginStrategy extends PassportStrategy(Strategy, "onelogin") {
  client: Client;

  constructor(private readonly userService: UserService, client: Client) {
    super({
      client,
      params: {
        redirect_uri: process.env.ONELOGIN_REDIRECT_URI,
        scope: "openid profile email",
      },
      passReqToCallback: false,
      usePKCE: false,
    });

    this.client = client;
  }

  async validate(tokenset: TokenSet): Promise<UserEntity> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokenset);

    if (!userinfo.email) {
      throw new UnauthorizedException();
    }

    const userEntity = await this.userService.findOne({email: userinfo.email});

    if (userEntity) {
      return userEntity;
    }

    throw new UnauthorizedException();
  }
}
