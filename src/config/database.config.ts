import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',

    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,

    synchronize: true,
    entities: [__dirname + '../**/*.entity.ts'],
    autoLoadEntities: true,
    cli: {
      entitiesDir: 'src/entity',
    },
  }),
);
