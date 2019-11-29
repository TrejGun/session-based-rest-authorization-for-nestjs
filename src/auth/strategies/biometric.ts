// eslint-disable-next-line import/named
import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
// eslint-disable-next-line import/default
import NodeRSA from "node-rsa";

import {UserEntity} from "../../user/user.entity";
import {UserService} from "../../user/user.service";

@Injectable()
export class BiometricStrategy extends PassportStrategy(Strategy, "biometric") {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: "email",
      passwordField: "signature",
    });
  }

  public async validate(email: string, signature: string): Promise<UserEntity> {
    const userEntity = await this.userService.findForAuth(email, "biometricPublicKey");

    if (!userEntity) {
      // throw new NotFoundException();
      throw new UnauthorizedException();
    }

    if (!userEntity.biometricPublicKey) {
      throw new UnauthorizedException();
    }

    const key = new NodeRSA();
    const signer = key.importKey(Buffer.from(userEntity.biometricPublicKey, "base64"), "pkcs8-public-der");
    const verified = signer.verify(Buffer.from(email), signature, "utf8", "base64");

    if (verified) {
      delete userEntity.biometricPublicKey;
      return userEntity;
    }

    throw new UnauthorizedException();
  }
}
