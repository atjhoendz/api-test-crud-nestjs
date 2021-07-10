import { ConfigModuleOptions } from '@nestjs/config';
import databaseConfig from './database.config';

export default (): ConfigModuleOptions => ({
  isGlobal: true,
  load: [databaseConfig],
});
