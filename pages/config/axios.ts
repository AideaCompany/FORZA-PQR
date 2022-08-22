import axios from 'axios'
import Cookie from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localHost:8080/api/V1',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(async request => {
  try {
    const token = await Cookie.get('authTokenPanel')
    console.log(token);
    

    if (token) {
      ;(request.headers as any).Authorization = `Bearer ${token}` as string
      ;(request.headers as any)['Content-Type'] = 'application/json'
    }

    return Promise.resolve(request)
  } catch (error) {
    console.error('[REQUEST ERROR]: ', error)
    return Promise.reject(error)
  }
})

axiosInstance.interceptors.response.use(async response => {
  try {
    if (response.data.token && response.data.token !== '' && response.data.ok) {
      await Cookie.set('authTokenPanel', response.data.token, { expires: 1 })
    }

    return Promise.resolve(response)
  } catch (error) {
    console.error('[RESPONSE ERROR]: ', error)
    return Promise.reject(error)
  }
})

export default axiosInstance

