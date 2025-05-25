import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { AuthModule } from './modules/auth/auth.module.ts';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module.ts';
import { PostModule } from './modules/post/post.module.ts';
import { UserModule } from './modules/user/user.module.ts';
import { ApiConfigService } from './shared/services/api-config.service.ts';
import { SharedModule } from './shared/shared.module.ts';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        throttlers: [configService.throttlerConfigs],
      }),
      inject: [ApiConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.dbConfig,
      inject: [ApiConfigService],
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          throw new Error('Missing DataSourceOptions');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    HealthCheckerModule,
  ],
  providers: [],
})
export class AppModule {}
