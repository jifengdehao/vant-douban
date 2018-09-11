import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'

const MIN_RES_CODE = 200
const MAX_RES_CODE = 300

export const get = (url, params = {}) => {
    return axios.get(url, {params}).then(res => {
        console.log({url: url, params: params, res: res})
        if (res.status < MIN_RES_CODE || res.status > MAX_RES_CODE) {
            return Promise.reject(new Error(res.status))
        }
        return Promise.resolve(res.data)
    }).catch(err => {
        console.log(err)
        Toast.fail('网络请求出错')
        return Promise.reject(err)
    })
}
export const post = (url, params = {}) => {
    return axios({
        methods: 'POST',
        data:qs.stringify(params)
    }).then(res=>{
        console.log({url: url, params: params, res: res})
        if (res.status < MIN_RES_CODE || res.status > MAX_RES_CODE) {
            return Promise.reject(new Error(res.status))
        }
        return Promise.resolve(res.data)
    }).catch(err=>{
        console.log(err)
        Toast.fail('网络请求出错')
        return Promise.reject(err)
    })
}
