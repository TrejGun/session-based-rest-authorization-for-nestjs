import {Issuer} from "openid-client";

import {UserService} from "../user/user.service";
import {OneloginStrategy} from "./strategies";

export const OneloginStrategyFactory = {
  provide: "OneloginStrategy",
  useFactory: async (userService: UserService): Promise<OneloginStrategy> => {
    // secret sauce! build the dynamic client before injecting it into the strategy
    // for use in the constructor super call.
    const TrustIssuer = await Issuer.discover(
      `https://${process.env.ONELOGIN_SUBDOMAIN}.onelogin.com/oidc/.well-known/openid-configuration`,
    );
    const client = new TrustIssuer.Client({
      client_id: process.env.ONELOGIN_CLIENT_ID,
      client_secret: process.env.ONELOGIN_CLIENT_SECRET,
      token_endpoint_auth_method: "client_secret_post",
    });
    return new OneloginStrategy(userService, client);
  },
  inject: [UserService],
};
