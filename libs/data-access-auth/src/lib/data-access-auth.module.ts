import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@foodmine-be/prisma-client';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RtStrategy } from './strategies/rt.strategy';
import { AtStrategy } from './strategies/at.strategy';

@Module({
  imports: [
    PrismaClientModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, RtStrategy, AtStrategy],
})
export class DataAccessAuthModule {}
