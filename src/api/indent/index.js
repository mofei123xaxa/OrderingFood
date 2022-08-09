import request from '../request'

// 登录接口
export const reqLogin = (loginfo)=>request({url:`/api/login`,method:'post',data:loginfo})

// 修改店铺信息列表
export const requpShop = (listShop)=>request({url:'/api/uploadshop',method:'post',data:listShop})

//图片上传接口
export const requploadres = ()=>request({url:'/api/uploadres',method:'post'})

// 查询商家信息是否存在 obtainshop  ,获取商家信息接口
export const reqObtainshop = ()=>request({url:`/api/obtainshop`,method:'get'})

// 更新商家数据 modiyshop
export const reqUpdateshop = (id)=>request({url:`/api/modiyshop`,method:'post',data:id})

// 菜品类目添加
export const reqCategory = (Category)=>request({url:`/api/addcategory`,method:'post',data:Category})

// 查询已经存在的商品类目
export const reqobtaincate = (page)=>request({url:`/api/obtaincate`,method:'get'})

// 查询菜品单位
export const reqDishMoney = ()=>request({url:`/api/obtainunit`,method:'get'})

// 添加菜品单位
export const reqAddDish = (obj)=>request({url:`/api/dishunit`,method:'post',data:obj})

// 上架菜品uploaddishes
export const reqAdddishes = (obj)=>request({url:`/api/uploaddishes`,method:'post',data:obj})

// 获取全部菜品数据
export const reqGetDish = (page)=>request({url:`/api/obtaindishes?page=${page}`,method:'get'})

// 下架菜品接口
export const reqSoldOut = (id,value)=>request({url:`/api/fromsale?id=${id}&value=${value}`,method:'get'})

// 下架菜品接口
export const reqSoldOuttrue = (id,value)=>request({url:`/api/fromsaleTrue?id=${id}&value=${value}`,method:'get'})

// 更新菜品数据
export const reqUpDish = (obj)=>request({url:`/api/modifydishes`,method:'post',data:obj})

// 查询全部的订单数据
export const reqOrder = (page,transac_status)=>request({url:`/api/obtainorder?page=${page}&transac_status=${transac_status}`,method:'get'})

// 获取详细菜品的数据
export const reqvieworder = (id)=>request({url:`/api/vieworder?id=${id}`,method:'get'})

// 商家接单接口
export const reqreceiving = (id)=>request({url:`/api/receiving?id=${id}`,method:'get'})

// 待结账接口
export const reqcheckout = (id,openid,sett_amount,order_no)=>request({url:`/api/checkout?id=${id}&openid=${openid}&sett_amount=${sett_amount}&order_no=${order_no}`,method:"get"});

// 生成新的小程序点单二维码接口
export const reqQrcode = (table)=>request({url:`/api/qrcode`,method:'post',data:table})

// 获取全部的桌号信息
export const reqGetqrcode = (page)=>request({url:`/api/getqrcode?page=${page}`,method:'get'})

// 获取前七天的销售额度
export const reqsalesvolume = ()=>request({url:'/api/salesvolume',method:'get'});