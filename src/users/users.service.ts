import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UtilService } from 'src/util/util.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from 'src/types/apiFeatures';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private utilService: UtilService,
    private prisma: PrismaService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<Message<Partial<User>>> {
    const { hash, salt } = this.utilService.hash(createUserDto.password);
    delete createUserDto.password;
    const {
      hash: h,
      hash: s,
      ...createdUser
    } = await this.prisma.user.create({
      data: { ...createUserDto, hash, salt, status: 'ACTIVE' },
    });
    return {
      data: createdUser,
      message: 'User created successfully',
    };
  }

  async findAll(): Promise<Message<Partial<User>[]>> {
    const users = await this.prisma.user.findMany({
      select: { email: true, fullName: true, id: true, status: true },
    });
    return {
      data: users,
      message: 'List of users',
    };
  }

  async findOne(id: string): Promise<Message<Partial<User>>> {
    const { hash, salt, ...user } = await this.prisma.user.findUnique({
      where: { id },
    });
    return {
      data: user,
      message: 'Fetched User',
    };
  }
  async findByEmail(email: string): Promise<Message<Partial<User>>> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return {
      data: user,
      message: 'Fetched User',
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Message<Partial<User>>> {
    delete updateUserDto.password;
    const { hash, salt, ...updatedUser } = await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
    return {
      data: updatedUser,
      message: `The user with an Id of ${id} was updated successfully`,
    };
  }
}
