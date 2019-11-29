import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";

import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {BiometricStrategy, FacebookStrategy, GoogleStrategy, LocalStrategy} from "./strategies";
import {OneloginStrategyFactory} from "./onelogin.factory";
import {SessionSerializer} from "./session.serializer";
import ormconfig from "../ormconfig";


describe("AuthService", () => {
  let servcontrollerce: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), UserModule, PassportModule],
      providers: [
        BiometricStrategy,
        FacebookStrategy,
        GoogleStrategy,
        LocalStrategy,
        OneloginStrategyFactory,
        SessionSerializer,
      ],
      controllers: [AuthController],
    }).compile();

    servcontrollerce = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(servcontrollerce).toBeDefined();
  });
});
