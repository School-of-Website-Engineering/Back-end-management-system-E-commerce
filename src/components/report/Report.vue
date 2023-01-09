<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>订单管理</el-breadcrumb-item>
			<el-breadcrumb-item>订单列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<br />
		<el-card> </el-card>
	</div>
</template>

<script>
export default {
	name: "Report",
	data() {
		return {};
	},
	methods: {},
	mounted() {}
};
</script>

<style scoped lang="scss"></style>
