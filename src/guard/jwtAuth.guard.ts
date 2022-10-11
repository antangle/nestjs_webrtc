import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { consts } from 'src/consts/consts';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UnauthorizedUserException } from 'src/exception/unauthorized.exception';
import { UtilService } from 'src/module/users/util/util.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
    async canActivate(context: ExecutionContext){
        const request: Request = context.switchToHttp().getRequest();
        const authorization: string = request.headers.authorization;
        if(!authorization) throw new UnauthorizedUserException(consts.JWT_NOT_EXIST, consts.JWT_STRATEGY_ERROR_CODE);
        
        //at from Authorization, rt from custom header Refresh-Token
        const accessToken: string = authorization.replace('Bearer ', '').trim();
        console.log(accessToken)
        return true;
    }
}
