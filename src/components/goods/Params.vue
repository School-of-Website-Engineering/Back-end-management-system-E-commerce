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
			<!-- 选择商品分类区域 -->
			<el-row class="cat_opt">
				<span>选择商品分类:</span>
				<!-- 选择商品分类的级联选择框 -->
				<el-cascader
					v-model="SelectedCateKeys"
					:options="catList"
					:props="{ expandTrigger: 'hover', ...cateProps }"
					@change="handleChange"
				></el-cascader>
			</el-row>
		</el-card>
	</div>
</template>

<script>

export default {
	data() {
		return {
			catList  : [], // 商品分类列表
			// 级联选择框的属性
			cateProps: {
				value   : "cat_id",
				label   : "cat_name",
				children: "children"
			},
			//级联选择框选中的双向绑定
			SelectedCateKeys: []
		};
	},
	created() {
		this.getParamsList();
	},
	methods: {
		async getParamsList() {
			const { data: res } = await this.$http.get("categories");
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取商品分类列表失败");
			}
			//获取成功
			this.catList = res.data;
		},
		//级联选择框选中项变化，会触发这个函数
		handleChange() {
			console.log(this.SelectedCateKeys);
		}
	}
};
</script>

<style scoped lang="scss">
.el-cascader {
	margin-left: 20px;
}
</style>
