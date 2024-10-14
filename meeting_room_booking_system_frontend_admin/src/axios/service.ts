import axios from "axios";
import { message } from 'antd';

export const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000
});


// 请求拦截器
service.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        // 为每个请求添加授权头
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 统一处理成功响应
        const { data, status } = response;
    
        console.log('没咩咩', response);
        
        // 可根据业务逻辑处理，比如检查 code、status 等
        if (status === 200 || status === 201) {
          return data; // 正常情况下直接返回数据
        } else {
          message.error(data.message || '请求失败，请稍后再试'); // 非200的状态可以自定义处理
          return Promise.reject(new Error(data.message || 'Error')); // 抛出错误供业务层捕获
        }
    },
    (error) => {
        // 处理请求错误，比如网络异常、超时、服务器错误等
        if (error.response) {
          const { status, data } = error.response;
          
          console.log('datadata',data);
          

          // 处理不同的 HTTP 状态码
          switch (status) {
            case 400:
              message.error(data.data || '请求错误');
              break;
            case 401:
              message.error('未授权，请重新登录');
              // 清除本地存储的 token 等信息
              localStorage.clear();
              window.location.href = '/login'; // 重定向到登录页
              break;
            case 403:
              message.error('拒绝访问');
              break;
            case 404:
              message.error('请求地址不存在');
              break;
            case 500:
              message.error('服务器错误');
              break;
            default:
              message.error(data.message || '系统繁忙，请稍后再试');
          }
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          message.error('请求超时，请检查网络');
        } else {
          // 其他错误
          message.error('请求失败');
        }
        return Promise.reject(error); // 抛出错误供业务层捕获
    }
  );
