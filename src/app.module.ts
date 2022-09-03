import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { getConfig } from './utils'

const configModule = ConfigModule.forRoot({
  ignoreEnvFile: true,
  isGlobal: true,
  load: [getConfig],
})

@Module({
  imports: [configModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
