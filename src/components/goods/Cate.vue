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
			<el-row>
				<el-col>
					<el-button type="primary">
						添加分类
					</el-button>
				</el-col>
			</el-row>
			<!-- 表格 -->
			<zk-table
				:data="cateList"
				:columns="columns"
				:selection-type="false"
				:expand-type="false"
				:show-index="true"
				:index-text="this.indexText"
				border
			>
				<!-- 是否有效 -->
				<template v-slot:isOk="scope">
					<i
						class="el-icon-success"
						v-if="scope.row.cat_deleted === false"
						style="color: lightgreen;"
					></i>
					<i class="el-icon-error" style="color: red;" v-else></i>
				</template>
				<!-- 排序 -->
				<template v-slot:order="scope">
					<el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
					<el-tag
						size="mini"
						type="success"
						v-else-if="scope.row.cat_level === 1"
						>二级</el-tag
					>
					<el-tag size="mini" type="warning" v-else>三级</el-tag>
				</template>
				<!-- 操作 -->
				<template v-slot:action="scope">
					<el-button
						type="primary"
						icon="el-icon-edit"
						size="small"
						@click="handleEdit(scope.row)"
					>
						编辑
					</el-button>
					<el-button
						type="danger"
						icon="el-icon-delete"
						size="small"
						@click="handleDelete(scope.row)"
					>
						删除
					</el-button>
				</template>
			</zk-table>
			<!-- 分页区 -->
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			indexText: "#",
			//查询条件
			queryInfo: {
				type    : 3,
				pagenum : 1,
				pagesize: 5
			},
			//商品分类数据
			cateList: [],
			//总条数
			total   : 0,
			//表格列
			columns : [
				{
					label: "分类名称",
					prop : "cat_name"
					// width   : '200',
					// align   : 'center',
					// sortable: true
				},
				{
					label   : "是否有效",
					type    : "template",
					template: "isOk"
				},
				{
					label   : "排序",
					type    : "template",
					template: "order"
				},
				{
					label   : "操作",
					type    : "template",
					template: "action"
				}
			]
		};
	},
	created() {
		this.getCateList();
	},
	methods: {
		//获取商品分类数据
		async getCateList() {
			const { data: res } = await this.$http.get("categories", {params: this.queryInfo});
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取商品分类数据失败");
			}
			console.log(res);
			//获取成功
			this.cateList = res.data.result;
			//获取总条数
			this.total = res.data.total;
		}
	}
};
</script>

<style lang="scss" scoped></style>
