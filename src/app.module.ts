import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UtilService } from './util/util.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { PrismaModule } from './prisma/prisma.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    DepartmentModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    UtilModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
