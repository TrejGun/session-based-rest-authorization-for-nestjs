import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";

import {UserModule} from "../user/user.module";
import {SessionSerializer} from "./session.serializer";
import {AuthController} from "./auth.controller";
import {OneloginStrategyFactory} from "./onelogin.factory";
import {BiometricStrategy, FacebookStrategy, GoogleStrategy, LocalStrategy} from "./strategies";

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    BiometricStrategy,
    FacebookStrategy,
    GoogleStrategy,
    LocalStrategy,
    OneloginStrategyFactory,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
