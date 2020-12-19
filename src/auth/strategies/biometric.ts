import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
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
    const userEntity = await this.userService.findOne({email});

    if (!userEntity) {
      throw new UnauthorizedException();
    }

    if (!userEntity.biometricPublicKey) {
      throw new UnauthorizedException();
    }

    const key = new NodeRSA();
    const signer = key.importKey(Buffer.from(userEntity.biometricPublicKey, "base64"), "pkcs8-public-der");
    const verified = signer.verify(Buffer.from(email), signature, "utf8", "base64");

    if (verified) {
      return userEntity;
    }

    throw new UnauthorizedException();
  }
}
