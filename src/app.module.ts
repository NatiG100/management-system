import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UtilService } from './util/util.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DepartmentModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UtilService],
})
export class AppModule {}
