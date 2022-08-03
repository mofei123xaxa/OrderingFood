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