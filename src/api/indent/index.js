import request from '../request'

// 登录接口
export const reqLogin = (loginfo)=>request({url:`/api/login`,method:'post',data:loginfo})