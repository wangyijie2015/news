import request from './../utils/request.js'

// 提供调用注册接口的函数
export const userRegisterService = (registerData) =>{
    // 借助于urlSearchParams完成参数传递
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key])
    }
    return request.post('/user/register',params);
}

// 提供登录接口的函数
// loginData请求登录的参数
export const loginService = (loginData)=>{
    var params = new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key])
    }
    return request.post('/user/login',params)
}

//文章列表查询
export const articleListService = (params) => {
    return request.get('/article', { params: params })
}

// 获取用户详细信息
export const userInfoService = ()=>{
    return request.get('/user/userInfo');
}

//修改个人信息
export const userInfoUpdateService = (userInfo)=>{
    return request.put('/user/update',userInfo)
}



import { defineStore } from "pinia"
import {ref} from 'vue'
export const useUserInfoStore = defineStore('userInfo',()=>{
    //1.定义用户信息
    const info = ref({})
    //2.定义修改用户信息的方法
    const setInfo = (newInfo)=>{
        info.value = newInfo
    }
    //3.定义清空用户信息的方法
    const removeInfo = ()=>{
        info.value={}
    }
    return{info,setInfo,removeInfo}
},{persist:true})

//修改头像
export const userAvatarUpdateService=(avatarUrl)=>{
    let params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}