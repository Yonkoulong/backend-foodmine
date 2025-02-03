import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../decorators";
import { ConfigService } from "@nestjs/config";
import { Request } from 'express';

@Injectable() 
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector, private configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if(!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('AT_SECRET')
            })
            request['user'] = payload
            return true;
        } catch {
           throw new UnauthorizedException(); 
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers['authorization'];
        if(!authHeader) return undefined;

        const [type, token] = authHeader?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}