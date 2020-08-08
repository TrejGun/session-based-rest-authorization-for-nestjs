import {BadRequestException, Injectable, ValidationError, ValidationPipe} from "@nestjs/common";

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: Array<ValidationError>): BadRequestException => new BadRequestException(errors),
      transform: true,
      forbidUnknownValues: true,
    });
  }
}
