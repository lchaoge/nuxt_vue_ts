import axios from 'axios';
import { Message, Notification } from 'element-ui'; // 这里使用了element-ui的消息提示方法，也可自行定义

// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json';

const service = axios.create({
  // baseURL: '/',
  timeout: 100000
});

// 请求拦截 可在请求头中加入token等
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截 对响应消息作初步的处理
service.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.code === '0000') {
      return response.data;
    } else {
      if (response.data.code !== '0000') {
        Message({
          type: 'error',
          message: response.data.msg,
          duration: 5000
        });
      }
      return response.data;
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.response.code = 400;
          error.response.msg = '错误请求';
          break;
        case 401:
          error.response.code = 401;
          error.response.msg = '未授权，请重新登录';
          break;
        case 403:
          error.response.code = 403;
          error.response.msg = '拒绝访问';
          break;
        case 404:
          error.response.code = 404;
          error.response.msg = '未找到资源';
          break;
        case 405:
          error.response.code = 405;
          error.response.msg = '请求方法未允许';
          break;
        case 408:
          error.response.code = 408;
          error.response.msg = '请求超时';
          break;
        case 500:
          error.response.code = 500;
          error.response.msg = '服务器出错';
          break;
        case 501:
          error.response.code = 501;
          error.response.msg = '网络未实现';
          break;
        case 502:
          error.response.code = 502;
          error.response.msg = '网络错误';
          break;
        case 503:
          error.response.code = 503;
          error.response.msg = '服务不可用';
          break;
        case 504:
          error.response.code = 504;
          error.response.msg = '网络超时';
          break;
        case 505:
          error.response.code = 505;
          error.response.msg = 'http版本不支持该请求';
          break;
        default:
          error.response.code = 9999;
          error.response.msg = `连接错误${error.response.status}`;
      }
      Notification.error({
        title: `${error.response.code}错误`,
        message: error.response.msg
      });
    }
  }
);

export default service;
