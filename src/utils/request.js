import axios from 'axios'
const service = axios.create({
    baseURL: 'http://192.168.0.103:8448/',
    // baseURL: 'https://192.168.4.244:8448/',
    timeout: 50000
})

service.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data) {
            // console.log(response.data)
            return response.data
        } else {
            return Promise.reject(new Error('请求失败'))
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
