import { Injectable } from '@nestjs/common';
import { PrismaService } from '@foodmine-be/prisma-client';
import { Prisma, User } from '@prisma/client';
import { AuthDto } from '../dto/auth.dto';
import { Tokens } from '@foodmine-be/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto): Promise<Tokens> {
    try {
      await this.prisma.user.create({
        data: {
          username: dto.username,
          hash: dto.password,
        },
      });
      return {
        accessToken: 'access',
        refreshToken: 'refresh',
      };
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('User already exists');
        }
      }
      throw error;
    }
  }

  async signIn(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
