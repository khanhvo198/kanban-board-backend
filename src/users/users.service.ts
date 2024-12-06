import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRequest } from './dto/create-user.request';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserRequest) {
    try {
      if (!data.email) {
        throw new HttpException(
          {
            errors: {
              email: 'Please input email',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!data.password) {
        throw new HttpException(
          {
            errors: {
              password: 'Please input password',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!data.confirmPassword) {
        throw new HttpException(
          {
            errors: {
              confirmPassword: 'Please input confirm password',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (data.password !== data.confirmPassword) {
        throw new HttpException(
          {
            errors: {
              confirmPassword:
                'Please input valid password and confirm password',
            },
          },
          HttpStatus.FORBIDDEN,
        );
      }

      return await this.prismaService.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: await bcrypt.hash(data.password, 10),
        },
        select: {
          email: true,
          name: true,
          id: true,
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
