import axios from 'axios'

import { Base64 } from 'js-base64';

const requests  = axios.create({
    baseURL:'/api',
    timeout:5000
})


function baseFun(){
    let token = localStorage.getItem('token');
    let base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
}

// 请求拦截器
requests.interceptors.request.use((config)=>{

    let token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = baseFun()
    }
   return config;
},(err)=>{
    return Promise.reject(err)
})


// 响应拦截器
requests.interceptors.response.use((res)=>{
    return res
},(err)=>{
    return Promise.reject(err)
})

export default requests;