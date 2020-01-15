// eslint-disable-next-line import/default
import Strategy from "passport-ldapauth";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";

@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, "ldap") {
  constructor() {
    super({
      server: {
        url: "ldap://127.0.0.1:389",
        bindDN: "root",
        bindCredentials: "password",
        searchBase: "o=users,o=example.com",
        searchFilter: "(uid={{username}})",
        searchAttributes: ["displayName", "mail"],
      },
    });
  }
}
