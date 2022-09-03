import { Request, Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'

@Catch()
export default class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    // const request = ctx.getRequest<Request>()

    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      code: HttpStatus.SERVICE_UNAVAILABLE,
      data: null,
      msg: exception.message,
      success: false,
    })
  }
}
