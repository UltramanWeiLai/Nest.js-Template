import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import HttpResponseTransforminterceptor from './common/interceptors/http-response-transform.interceptor'
import BaseExceptionFilter from './common/exceptions/base.filter'
import HttpExceptionFilter from './common/exceptions/http.filter'
import generateDocument from './doc'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 接口版本控制
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1'],
    type: VersioningType.URI,
  })

  // 全局拦截器
  app.useGlobalInterceptors(new HttpResponseTransforminterceptor())

  // 全局异常过滤器
  app.useGlobalFilters(new BaseExceptionFilter(), new HttpExceptionFilter())

  generateDocument(app)
  await app.listen(3000)
}
bootstrap()
