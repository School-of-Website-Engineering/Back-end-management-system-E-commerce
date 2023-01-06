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
			<!-- tab页签 -->
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="动态参数" name="many">
					<el-button type="primary" size="mini" :disabled="isBtnDisabled"
						>添加参数</el-button
					>
					<br />
					<br />
					<!-- 动态参数表格 -->
					<el-table :data="manyTableData" border stripe>
						<!-- 展开行 -->
						<el-table-column type="expand"></el-table-column>
						<!-- 索引列 -->
						<el-table-column type="index" label="#"></el-table-column>
						<el-table-column
							label="参数名称"
							prop="attr_name"
						></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="primary" size="mini" icon="el-icon-edit"
									>编辑</el-button
								>
								<el-button type="danger" size="mini" icon="el-icon-delete"
									>删除</el-button
								>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="静态属性" name="only">
					<el-button type="primary" size="mini" :disabled="isBtnDisabled"
						>添加属性</el-button
					>
					<br />
					<br />
					<!-- 静态表格 -->
					<el-table :data="onlyTableData" border stripe>
						<!-- 展开行 -->
						<el-table-column type="expand"></el-table-column>
						<!-- 索引列 -->
						<el-table-column type="index" label="#"></el-table-column>
						<el-table-column
							label="属性名称"
							prop="attr_name"
						></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="primary" size="mini" icon="el-icon-edit"
									>编辑</el-button
								>
								<el-button type="danger" size="mini" icon="el-icon-delete"
									>删除</el-button
								>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
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
			SelectedCateKeys: [],
			// 被激活的tab页签的名称
			activeName      : "many",
			//动态数据table
			manyTableData   : [],
			//静态数据table
			onlyTableData   : []
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
			this.getParamsData();
		},
		//tab页签点击事件
		handleClick() {
			this.getParamsData();
		},
		//获取参数列表数据
		async getParamsData() {
			const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: { sel: this.activeName }});
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取参数列表失败");
			}
			//获取成功,判断是动态参数还是静态属性
			if (this.activeName === "many") {
				this.manyTableData = res.data;
			}
			else {
				this.onlyTableData = res.data;
			}
		}
	},
	computed: {
		//如果按钮需要被禁用，则返回true，否则返回false
		isBtnDisabled() {
			return this.SelectedCateKeys.length !== 3;
		},
		//当前选中的三级分类的id
		cateId() {
			return this.SelectedCateKeys[2];
		}
	}
};
</script>

<style scoped lang="scss">
.el-cascader {
	margin-left: 20px;
}
</style>
