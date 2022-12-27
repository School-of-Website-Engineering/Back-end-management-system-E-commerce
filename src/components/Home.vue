<template>
	<el-container class="home-container">
		<!-- 头部 -->
		<el-header>
			<div>
				<img src="../assets/logo.png" alt="" />
				<span>电商后台管理系统</span>
			</div>
			<!--退出按钮-->
			<el-button type="danger" @click="logout">退出</el-button></el-header
		>
		<!-- 页面主体 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="200px">
				<el-menu
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409bff"
					unique-opened="true"
				>
					<!-- 一级菜单 -->
					<el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
						<!-- 模板区域 -->
						<template slot="title">
							<i :class="iconsObj[item.id]"></i>
							<span>{{item.authName}}</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item :index="subItem.id + ''" v-for="subItem in item.children" :key="subItem.id">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>{{ subItem.authName }}</span>
							</template>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- 右侧内容主体区域 -->
			<el-main></el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			//左侧菜单数据
			menulist: [],
			// 字体
			iconsObj: {
				"125": "iconfont icon-user",
				"103": "iconfont icon-tijikongjian",
				"101": "iconfont icon-shangpin",
				"102": "iconfont icon-danju",
				"145": "iconfont icon-baobiao"
			}
		};
	},
	created() {
		this.getMenuList()
	},
	methods: {
		//	退出登录
		logout() {
			window.sessionStorage.clear();
			this.$router.push("/login");
		},
		//	获取菜单列表
		async getMenuList() {
			const {data: res} = await this.$http.get("menus");
			if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
			}
			this.menulist = res.data;
		}
	}
};
</script>

<style lang="scss" scoped>
.el-header {
	background-color: #373d41;
	display: flex;
	justify-content: space-between;
	padding-left: 0;
	align-items: center;
	color: #fff;
	img {
		height: 28px;
	}
	div {
		display: flex;
		align-items: center;
		span {
			margin-left: 10px;
			font-size: 18px;
		}
	}
}
.el-aside {
	background-color: #333744;
}
.el-main {
	background-color: #eaedf1;
}
.home-container {
	height: 100vh;
}
.iconfont{
	margin-right: 10px;
}
</style>
