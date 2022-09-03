import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'

interface Response<T> {
  data: T
}

@Injectable()
export default class HttpResponseTransforminterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        msg: 'success',
        code: 200,
        success: true,
      }))
    )
  }
}
