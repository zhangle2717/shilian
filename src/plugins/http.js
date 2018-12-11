import axios from 'axios'
import Qs from 'qs'
const httpAxios = {}
httpAxios.install = function (Vue) {
  const instance = axios.create({
    baseURL: 'http://192.168.1.50',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
   
    }
  })

  instance.interceptors.request.use(function (config) {
    if(config.data){
      config.data=Qs.stringify(config.data)
    }
    // if (config.url.toLowerCase() !== 'login') {
    //   const token = sessionStorage.getItem('token')
    //   config.headers.Authorization = token
    // }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(function (response) {
    return response
  })
  Vue.prototype.$http = instance
}
export default httpAxios
