import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";

import {createRedisClient} from "./redis";

interface ISessionMiddlewareProps {
  url: string;
  secret: string;
  maxAge?: number;
  name?: string;
}

export const sessionMiddleware = (props: ISessionMiddlewareProps): express.RequestHandler => {
  const {url, secret, name = "sid", maxAge = 30 * 24 * 60 * 60} = props;
  return session({
    cookie: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: maxAge * 1000,
      signed: false,
      sameSite: "none",
    },
    name,
    resave: false,
    secret,
    store: new (connectRedis(session))({client: createRedisClient(url)}),
    saveUninitialized: true,
    proxy: true,
  });
};
