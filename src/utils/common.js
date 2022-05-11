/**
 * 模拟异步延迟操作
 */
export const delay = (time = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

/**
 * 删除参数中为空字符串的值 删除参数前后空格
 * @param {*} params
 */
export const trimParams = params => {
  let result = {};
  Object.keys(params).map(key => {
    let value = params[key]
    if (value !== '' && value !== undefined) {
      result[key] = typeof value === 'string' ? value.trim() : value
    }
  })
  return result
}
/**
 * 防抖函数方法
 * @param {*} fn 执行函数
 * @param {*} wait 防抖时间
 */
export const debonce = (fn, wait) => {
  let timer = null;
  return function () {
    let context = this, args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
  }
}
