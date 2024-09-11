import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('google-login')
    async googleLogin(@Body('token') token: string) {
        return this.authService.verifyGoogleToken(token);
    }

    @Post('facebook-login')
    async facebookLogin(@Body('token') token: string) {
        return this.authService.verifyFacebookToken(token);
    }
}
