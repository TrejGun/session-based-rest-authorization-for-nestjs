import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MinLength} from "class-validator";

import {IUserCreateFields} from "../interfaces";


export class UserCreateSchema implements IUserCreateFields {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  public password: string;
}
