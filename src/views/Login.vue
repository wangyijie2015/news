<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
// 定义数据模型
const registerData = ref({
    username: '',
    password: '',
    repassword: ''
})

// 定义校验密码的函数
const checkRePassword = (rule,value,callback) =>{
    if(value === ''){
        callback(new Error('请再次确认密码'))
    } else if(value !== registerData.value.password){
        callback()
    } else{
        callBack()
    }
}

// 定义表单校验规则
const rules={
    username:[
        {required:true,message:'请输入用户名',trigger:'blur'},
        {min:5,max:16,message:'长度为5~16位非空字符',trigger:'blur'}
    ],
    password:[
        {required:true,message:'请输入密码',trigger:'blur'},
        {min:5,max:16,message:'长度为5~16位非空字符',trigger:'blur'}
    ],
    repassword:[
        {validator:checkRePassword,trigger:'blur'}
    ],
}

// 调用后台接口，完成注册
import {userRegisterService,loginService} from '@/api/user.js'
import { alertProps } from 'element-plus';
import {useRouter} from 'vue-router'
const router = useRouter()
const register = async() =>{
    // registerData是一个响应式对象
    let result = await userRegisterService(registerData.value);
    ElMessage.success(result.msg? result.msg:'注册成功了')
    // alert(res.msg? res.msg:'注册成功了');
    // if(res.code === 0){
    //     // 成功了
    //     alert(res.msg? res.msg:'注册成功了');
    // }else{
    //     // 注册失败了
    //     alert('注册失败了')
    // }


}

//导入token状态
import { useTokenStore } from '@/stores/token.js'
//调用useTokenStore得到状态
const tokenStore = useTokenStore();
// 绑定数据
// 表单的数据校验
const login = async () => {
    let result = await loginService(registerData.value)
    //保存token
    tokenStore.setToken(result.data)
    
    ElMessage.success('登录成功!')
    router.push('/')
}
    // alert(res.msg? res.msg:'登录成功了');
    // if(res.code === 0){
    //     alert(res.msg? res.msg:'登录成功了');
    // } else{
    //     alert('登录失败了')
    // }
    
    // 借助于路由完成跳转
//     router.push('/')
// }

// 定义函数清空数据模型数据
const clearRegisterData = async()=>{
    registerData.value={
        username: '',
        password: '',
        repassword: ''
    }
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请神木丽输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.repassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>