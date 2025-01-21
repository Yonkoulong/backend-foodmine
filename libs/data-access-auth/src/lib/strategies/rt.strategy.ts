import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt} from "passport-jwt";
import { Request } from "express";
import { JwtPayload } from "@foodmine-be/common";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('RT_SECRET'),
            passReqToCallback: true //help validate method receives the request object as the first argument.
        })
    }

    async validate(req: Request, payload: JwtPayload) {
        
        const refreshToken = req.get('authorization')?.split(' ')[1];
       
        return {
            ...payload,
            refreshToken
        }
    }
}