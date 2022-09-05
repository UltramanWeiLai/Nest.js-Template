import axios from 'axios'
import { getConfig } from '@/utils'

const { FEISHU_APP_CONFIG } = getConfig()

const request = async (url: string, options: Record<any, any> = {}) => {
  try {
    return axios.request({ url, ...options })
  } catch (error) {
    console.error('request url: ', url)
    console.error('request error:', error)
    throw error
  }
}

const methodVersion = async (url: string, options: Record<any, any>) => {
  try {
    const sendUrl = url.startsWith('http') ? url : `${FEISHU_APP_CONFIG.url}${url}`
    const { headers = {}, ...rest } = options
    return new Promise((resolve, reject) => {
      axios({
        url: sendUrl,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          ...headers,
        },
        ...rest,
      })
        .then(resolve)
        .catch(reject)
    })
  } catch (error) {
    console.error('request url: ', url)
    console.error('request error:', error)
    throw error
  }
}

export { request, methodVersion }
