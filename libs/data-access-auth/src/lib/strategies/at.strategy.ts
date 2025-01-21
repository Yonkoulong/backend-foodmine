import { JwtPayload } from "@foodmine-be/common";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable() 
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('AT_SECRET')
        })
    }

    async validate(payload: JwtPayload) {
        return payload;
    }
}