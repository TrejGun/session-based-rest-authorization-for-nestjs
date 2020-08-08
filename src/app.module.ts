import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {APP_GUARD, APP_PIPE} from "@nestjs/core";

import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {TypeOrmConfigService} from "./typeorm.options";
import {LocalGuard, RolesGuard} from "./common/guards";
import {CustomValidationPipe} from "./common/pipes";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: LocalGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
