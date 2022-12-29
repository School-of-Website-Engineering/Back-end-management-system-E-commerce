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
		name     : "home",
		redirect : "/welcome",
		children : [
			{
			//导入欢迎组件
				path     : "/welcome",
				component: () => import("@/components/Welcome"),
				name     : "welcome"
			},
			{
			//导入用户组件
				path     : "/users",
				component: () => import("@/components/user/Users"),
				name     : "users"
			},
			//导入权限组件
			{
				path     : "/rights",
				component: () => import("@/components/power/Rights"),
				name     : "rights"
			}
		]
	}
];
