import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as pkg from '../package.json'

export default function generateDocument(app) {
  const options = new DocumentBuilder().setTitle(pkg.name).setDescription(pkg.description).setVersion(pkg.version).addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/document', app, document)
}
