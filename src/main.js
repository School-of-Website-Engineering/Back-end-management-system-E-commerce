import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//使用element ui插件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//导入axios
import axios from "axios";
//配置axios的基础路径
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/";
Vue.prototype.$http = axios;
//请求拦截器
axios.interceptors.request.use((config) => {
	config.headers.Authorization = window.sessionStorage.getItem("token");
	return config;
});

//导入表格树插件
import ZkTable from "vue-table-with-tree-grid";

Vue.use(ZkTable);

//导入图标字体
import "./assets/fonts/iconfont.css";

//全局样式表
import "./assets/scss/global.scss";

Vue.config.productionTip = false;

new Vue({ router, render: (h) => h(App) }).$mount("#app");
