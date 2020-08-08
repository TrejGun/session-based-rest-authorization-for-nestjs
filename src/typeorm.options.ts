import {Injectable} from "@nestjs/common";
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from "@nestjs/typeorm";
import ormconfig from "./ormconfig";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...ormconfig,
      keepConnectionAlive: process.env.NODE_ENV === "test",
    };
  }
}
