<template>
	<el-container class="home-container">
		<!-- 头部 -->
		<el-header>
			<!--退出按钮-->
			<el-button type="danger" @click="logout">退出</el-button></el-header
		>
		<!-- 页面主体 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="200px"></el-aside>
			<!-- 右侧内容主体区域 -->
			<el-main></el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	name   : "Home",
	methods: {
		//	退出登录
		logout() {
			window.sessionStorage.clear();
			this.$router.push("/login");
		}
	}
};
</script>

<style lang="scss" scoped>
.el-header {
	background-color: #373D41;
}
.el-aside{
	background-color: #333744
}
.el-main{
	background-color: #eaedf1;
}
.home-container{
	height: 100vh;
}
</style>
