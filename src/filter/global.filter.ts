import { ApiResult } from './../types/user.d';
import { CustomError } from './../exception/custom.exception';

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, NotFoundException, Inject, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseExceptionFilter, Reflector } from '@nestjs/core';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { consts } from 'src/consts/consts';
import { makeApiResponse } from 'src/util/util';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  constructor(private logger: LoggerService){
    super()
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    //for logging
    let data: any;
    let msg: string;
    console.log(exception);
//    this.logger.warn(exception);
    if(exception.message) msg = exception.message;
    
    //for api response
    let apiResponse: ApiResult;
    switch(exception.constructor){
      case CustomError:
        if(!msg) msg = consts.CUSTOM_ERROR_MSG;
        apiResponse = makeApiResponse(HttpStatus.I_AM_A_TEAPOT, null, msg)
      default:
        if(!msg) msg = consts.SERVER_ERROR;
        apiResponse = makeApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, msg)
        break;
    }

    res.json(apiResponse);
  }
}