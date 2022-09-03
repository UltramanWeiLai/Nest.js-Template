import { HttpException, HttpStatus } from '@nestjs/common'

export default class BusinessException extends HttpException {
  constructor(message: string, code: number = HttpStatus.OK) {
    super({ message, code }, HttpStatus.OK)
  }

  static throwForbidden() {
    throw new BusinessException('没有权限', HttpStatus.FORBIDDEN)
  }
}
