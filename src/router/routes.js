export default [
	//重定向
	{
		path    : "/",
		redirect: "/login"
	},
	//导入登录组件
	{
		path     : "/login",
		component: () => import("@/components/Login"),
		name     : "login"
	},
	//导入主页组件
	{
		path     : "/home",
		component: () => import("@/components/Home"),
		name     : "home"
	}
];
