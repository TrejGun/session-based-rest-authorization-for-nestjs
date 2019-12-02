import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {TypeOrmConfigService} from "./typeorm.options";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
