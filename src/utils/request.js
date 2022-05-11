import axios from "axios";
import { trimParams } from "./common.js"

const SUCCESS_CODE = 1;

const WITH_BODY_REQUESTS = ['put', 'get', 'post', 'patch'];

const fetch = (options) => {
  let {
    url, method = 'get', data={},
    headers = { 'Content-Type': 'application/json;utf-8', "X-Requested-With": "XMLHttpRequest" },
    ...restOptions
  } = options;
  // 兼容get写法
  if(typeof options === 'string') {
    url = options
    method = 'get'
  }
  data = (!(data instanceof FormData) && trimParams(data)) || data
  method = method.toLowerCase();

  if (WITH_BODY_REQUESTS.includes(method)) {
    return axios({ url, method, data, headers,
      ...restOptions
    });
  }else {
    return axios({ url, method, params: data, headers,
      ...restOptions
    });
  }
};

export default async function request(options) {
  return fetch(options)
    .then((response) => {
      const { status: statusCode, statusText, data: resData } = response;
      const { code, msg } = resData;
      if (code === '403') {
        console.log('未授权')
      }
      let meta = {
        success: SUCCESS_CODE === code,
        message: msg || statusText,
        statusCode,
        code,
      };
      
      return { ...meta, ...resData };
    })
    .catch((error) => {
      const { response } = error;
      let message;
      let statusCode;
      if (response && response instanceof Object) {
        const { status, statusText, data } = response;
        const { msg } = data;
        statusCode = status;
        message = msg || statusText;
      }
      return { success: false, message, statusCode };
    });
}