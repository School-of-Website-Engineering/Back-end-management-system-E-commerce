<template>
	<div>
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>
		<br />
		<!--卡片视图区-->
		<el-card>
			<!-- 警告区域 -->
			<el-alert
				title="注意：商品参数只能添加三级分类"
				type="warning"
				closable
				show-icon
			></el-alert>
			<br />
			<!-- 选择商品分类的级联选择框 -->
			
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {
		this.getParamsList();
	},
	methods: {
		async getParamsList() {
			const res = await this.$http.get("categories", {params: {type: 3}});
			console.log(res);
		}
	}
};
</script>

<style scoped lang="scss"></style>
