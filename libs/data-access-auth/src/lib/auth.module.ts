import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@foodmine-be/prisma-client';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaClientModule],
})
export class DataAccessAuthModule {}
