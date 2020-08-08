import "./env";
import {NestFactory} from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";
import session from "express-session";
import passport from "passport";
import connectRedis from "connect-redis";
import * as redis from "redis";

import {AppModule} from "./app.module";


async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    // @ts-ignore
    session({
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        signed: false,
      },
      name: "nest",
      resave: false,
      secret: process.env.SESSION_SECRET_KEY,
      // @ts-ignore
      store: new (connectRedis(session))({client: redis.createClient(process.env.REDIS_URL)}),
      saveUninitialized: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const options = new DocumentBuilder()
    .setTitle("session-based-authorization-for-nestjs")
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(process.env.PORT, process.env.HOST, () => {
    // eslint-disable-next-line no-console
    console.info(`Express server is running on http://${process.env.HOST}:${process.env.PORT}/`);
  });
}

void bootstrap();
