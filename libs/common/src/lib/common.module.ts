import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards';
import { AuthGuard } from './guards/auth.guard';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters';
import { ResponseInterceptor } from './interceptors';

@Global()
@Module({
  imports: [JwtModule.register({})],
  exports: [RolesGuard, JwtModule],
  providers: [
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ],
})
export class CommonModule {}
