import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@foodmine-be/prisma-client';
import { Tokens } from '@foodmine-be/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService
  ) {}

  async signUp(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          hash,
          role: 'user'
        },
      });

      const tokens = await this.signToken(user.id, user.username, user.role ?? undefined);
      await this.updateHashRt(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('User already exists');
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto): Promise<Tokens> {    
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const tokens = await this.signToken(user.id, user.username, user.role ?? undefined);
    await this.updateHashRt(user.id, tokens.refreshToken);
    return tokens;
  }

  async signToken(id: number, username: string, role?: string): Promise<Tokens> {
    const payload = {
      sub: id,
      username,
      role
    };

    const atSecret = this.config.get('AT_SECRET');
    const rtSecret = this.config.get('RT_SECRET');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: atSecret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: rtSecret,
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateHashRt(id: number, refreshToken: string): Promise<void> {
    const hash = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id },
      data: {
        hashRt: hash,
      },
    });
  }

  async refreshToken(id: number, refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user || !user.hashRt) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await argon.verify(user.hashRt, refreshToken);

    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.signToken(user.id, user.username);
    await this.prisma.user.update({
      where: { id },
      data: {
        hashRt: refreshToken,
      },
    });

    return tokens;
  }

  async logout(id: number): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
  }
}
