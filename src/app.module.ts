import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { LoginModule } from './modules/login/login.module';
import { AuthMiddleware } from './middlewares/Auth.middleware';
import { VerifyKeys } from './middlewares/VerifyUpdateKeys.middleware';
import { VerifyUpdateKeys } from './middlewares/VerifyKeys.middleware';
import { StatusModule } from './modules/status/status.module';
import { StacksModule } from './modules/stacks/stacks.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ApplicationsModule,
    LoginModule,
    StatusModule,
    StacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, VerifyKeys)
      .forRoutes({ path: 'applications', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'applications', method: RequestMethod.ALL });
    consumer
      .apply(AuthMiddleware, VerifyUpdateKeys)
      .forRoutes({ path: 'applications/:app_id', method: RequestMethod.PATCH });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'status/:status_id', method: RequestMethod.PATCH });
  }
}
