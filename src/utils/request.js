import axios from "axios";
// import { Toast } from "vant";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/x-www-form-urlencoded",
    "Cache-Control": "no-cache"
  },
  // headers: { "Content-Type": "application/x-www-form-urlencoded" },
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});
// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
    NProgress.start();
    // Toast.loading({
    //   message: "加载中...",
    //   forbidClick: true,
    // });
    let token = (store.getters && store.getters.token) || "";
    if (token) {
      config.headers["token"] = token; // token
    }
    return config;
  },
  error => {
    NProgress.done();
    // Toast.clear();
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    NProgress.done();
    // Toast.clear();
    let res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status == 200) {
      return res;
    } else {
      //   Toast({
      //     message: res.error || res.message || "Error",
      //     type: "fail",
      //     duration: 3 * 1000,
      //   });
      return Promise.reject(new Error(response.message || "Error"));
    }
  },
  error => {
    NProgress.done();
    // Toast.clear();
    console.log("err" + error); // for debug
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000,
    //   showClose: true
    // });
    return Promise.reject(error);
  }
);

export default request;
