import { Request, Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import BusinessException from './business'

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    // const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    if (exception instanceof BusinessException) {
      const data = exception.getResponse() as { message: string; code: number }
      response.status(HttpStatus.OK).send({
        code: data.code,
        data: null,
        msg: data.message,
        success: false,
      })
    } else {
      response.status(status).send({
        code: status,
        data: null,
        msg: exception.message,
        success: false,
      })
    }
  }
}
