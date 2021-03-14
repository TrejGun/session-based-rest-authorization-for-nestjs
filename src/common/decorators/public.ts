import {SetMetadata} from "@nestjs/common";

export const Public = (): ((target: any, key?: any, descriptor?: any) => any) => SetMetadata("isPublic", true);
