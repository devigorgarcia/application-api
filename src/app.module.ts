import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [PrismaModule, UsersModule, ApplicationsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
