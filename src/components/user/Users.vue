<template>
	<div>
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--卡片视图区-->
		<br />
		<el-card>
			<el-row :gutter="20">
				<el-col :span="8">
					<!-- 搜索 -->
					<el-input
						placeholder="请输入内容"
						v-model="input3"
						class="input-with-select"
					>
						<el-select v-model="select" slot="prepend" placeholder="请选择">
							<el-option label="餐厅名" value="1"></el-option>
							<el-option label="订单号" value="2"></el-option>
							<el-option label="用户电话" value="3"></el-option>
						</el-select>
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary">添加用户</el-button>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.el-card {
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
</style>
