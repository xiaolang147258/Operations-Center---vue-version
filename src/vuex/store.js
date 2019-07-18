import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//初始化数据
const state = {
  count: 0,
  
  //全局接口域名
  //  url_data:'http://operate-center.cieo.com.cn';http://47.112.138.229:7041
   url_data:'http://operate-center.cieo.com.cn',
   
   
   
  //工作台-消息列表数据 
   message_box:[],
  //工作台-审核列表数据 
   audit_box:[],
   
  //进入审核详情传递的id
   audit_id:'',
   
   //进入审核详情判断是审核还是详情
   audit_val:'',//审核||详情
   
   //课程进入添加||编辑页传递的id
   course_id:'',
   
};
var vuexStore = new Vuex.Store({
  state
});
// 使用 export default 封装，让外部可以访问
export default vuexStore;
