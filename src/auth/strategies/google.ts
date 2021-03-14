import {OAuth2Strategy} from "passport-google-oauth";
import {Profile} from "passport";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";

import {UserEntity} from "../../user/user.entity";
import {UserService} from "../../user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, "google") {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    });
  }

  public async validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<UserEntity> {
    if (!profile.emails) {
      throw new UnauthorizedException();
    }

    const userEntity = await this.userService.findOne({email: profile.emails[0].value});

    if (userEntity) {
      return userEntity;
    }

    throw new UnauthorizedException();
  }
}
