import request from '@/utils/request.js'
import { useTokenStore } from '../stores/token'
//文章分类列表查询
export const articleCategoryListService = ()=>{
    // const tokenStore= useTokenStore();
    
      //通过请求头Authorization携带token
    // return request.get('/category',{ headers: { 'Authorization': tokenStore.token }
    return request.get('/category')
}

// 文章分类添加
// 添加文章分类 需要json格式的参数
export const articleCategoryAddService = (categoryModel) => {
  return request.post('/category', categoryModel)
}

export const articleCategoryUpdateService = (categoryModel)=>{
  return request.put('/category',categoryModel)
}

//删除分类
export const articleCategoryDeleteService = (id) => {
  return request.delete('/category?id='+id)
}

// 文章列表查询
export const articleListService = (params) => {
  return request.get('/article',{params:params})
}

//添加文章
export const articleAddService = (articleModel)=>{
  return request.post('/article',articleModel)
}
