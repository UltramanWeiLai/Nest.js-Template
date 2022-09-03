import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parse } from 'yaml'

export const getEnv = (): string => {
  return process.env.NODE_ENV || 'dev'
}

export const getConfig = (): any => {
  const env = getEnv()
  const configPath = resolve(process.cwd(), './config', `${env}.yaml`)
  console.log('configPath:', configPath)
  const config = parse(readFileSync(configPath, 'utf8'))
  return config
}
