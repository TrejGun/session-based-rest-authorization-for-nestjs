import {Strategy} from "passport-facebook";
import {Profile} from "passport";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";

import {UserEntity} from "../../user/user.entity";
import {UserService} from "../../user/user.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "birthday", "email", "gender", "link", "name", "locale", "picture"],
    });
  }

  public async validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<UserEntity> {
    const userEntity = await this.userService.findOne({email: profile.emails![0].value});
    if (userEntity) {
      return userEntity;
    }
    throw new UnauthorizedException();
  }
}
