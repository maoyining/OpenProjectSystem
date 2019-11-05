import axios from 'axios';
import router from '../router'
import store from '../store'

let http = axios.create({
    baseURL: '',
    // baseURL: 'http://localhost:8080',
    withCredentials:true,//跨域
    headers:{
        // 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
        'Content-Type':'application/json;charset=utf-8'
    },//请求头
    // transformRequest:[function(data){
    //     let newData='';
    //     for (let k in data){
    //         if(data.hasOwnProperty(k) === true){
    //             newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k])+'&';
    //         }
    //     }
    //     return newData;
    // }]
});

function apiAxios(method,url,params,response){
    http({
        method:method,
        url:url,
        headers: {
          Authorization: "Bearer " + store.state.token
        },
        data:method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method ==='DELETE'? params :null,
    }).then(function(res){
        response(res);
    }).catch(function(err){
      if (err.response && err.response.status === 401) {
        router.push({ path: "/login" });
      } else {
        response(err);
      }
    });
}
export default {
    get: function (url, params, response) {
      return apiAxios('GET', url, params, response)
    },
    post: function (url, params, response) {
      return apiAxios('POST', url, params, response)
    },
    put: function (url, params, response) {
      return apiAxios('PUT', url, params, response)
    },
    delete: function (url, params, response) {
      return apiAxios('DELETE', url, params, response)
    }
}
