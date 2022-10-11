import { User } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { consts } from 'src/consts/consts';
import { AuthorizedUser } from 'src/types/user';

@Injectable()
export class UtilService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}
    
    makePayload(user: User | any, type: string = 'local'): AuthorizedUser{
        let payload: AuthorizedUser = {
            id: user.id,
            email: user.email,
            type: type
        };
        if(user.auth) payload.authId = user.auth[0].id;
        else if(user.authId) payload.authId = user.authId;
        return payload;
    }

    signJwt(user: User | any, type: string = consts.LOCAL){
        const payload = this.makePayload(user, type);
        const access_token = this.jwtService.sign(payload, {
            expiresIn: consts.JWT_ACCESS_TOKEN_EXP
        })
        const refresh_token = this.jwtService.sign({}, {
            expiresIn: consts.JWT_REFRESH_TOKEN_EXP
        });
        return {
            access_token,
            refresh_token
        };
    }

    async hashPassword(password: string): Promise<string>{
        const rounds: number = this.configService.get<number>('BCRYPT_SALT');
        const salt: string = await bcrypt.genSalt(+rounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }
}
