import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

config();

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    url: configService.get('DATABASE_URL'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    cache: true,
    extra: {
      max: 30, // 连接池最大连接数
      min: 5, // 连接池最小连接数
      idleTimeoutMillis: 30000, // 闲置超时30秒
      connectionTimeoutMillis: 5000, // 连接超时5秒
    },
  };
};

console.log(__dirname);

// This is optional and not required, but if you need to access your DataSource in other places
const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
  synchronize: false,
  cache: true,
  extra: {
    max: 30, // 连接池最大连接数
    min: 5, // 连接池最小连接数
    idleTimeoutMillis: 30000, // 闲置超时30秒
    connectionTimeoutMillis: 5000, // 连接超时时间
    statement_timeout: 5000, // SQL语句超时时间
  },
});

// dataSource
//   .initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization:', err);
//   });

export default dataSource;
