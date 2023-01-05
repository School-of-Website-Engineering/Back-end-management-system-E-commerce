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
					<el-button type="primary" @click="showAddCateDialog">
						添加分类
					</el-button>
				</el-col>
			</el-row>
			<br />
			<!-- 表格 -->
			<zk-table
				:data="cateList"
				:columns="columns"
				:selection-type="false"
				:expand-type="false"
				:show-index="true"
				:index-text="this.indexText"
				border
				:show-row-hover="false"
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
			<br />
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[2, 3, 5, 10]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>
		<!-- 添加分类对话框 -->
		<el-dialog
			title="添加分类"
			:visible.sync="addCateDialogVisible"
			width="50%"
		>
			<el-form
				:model="addCateForm"
				:rules="addCateFormRules"
				ref="addCateForRef"
				label-width="100px"
			>
				<el-form-item label="分类名称:" prop="cat_name">
					<el-input v-model="addCateForm.cat_name"></el-input>
				</el-form-item>
				<el-form-item label="父级分类:">
					<el-input v-model="addCateForm.cat_name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addCateDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addCateDialogVisible = false"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//添加分类表单数据
			addCateForm: {
				// 名称
				cat_name   : "",
				// 父级id
				cat_pid    : 0,
				// 级别
				cat_level  : 0,
				// 是否有效
				cat_deleted: false
			},
			//添加分类表单验证规则
			addCateFormRules: {
				cat_name: [
					{ required: true, message: "请输入分类名称", trigger: "blur" },
					{ min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
				]
			},
			//控制添加分类对话框的显示与隐藏
			addCateDialogVisible: false,
			indexText           : "#",
			//查询条件
			queryInfo           : {
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
			],
			//父级分类数据
			parentCateList: []
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
		},
		//页码改变
		handleSizeChange(newSize) {
			this.queryInfo.pagesize = newSize;
			this.getCateList();
		},
		//每页条数改变
		handleCurrentChange(newPage) {
			this.queryInfo.pagenum = newPage;
			this.getCateList();
		},
		//点击按钮显示添加分类对话框
		showAddCateDialog() {
			//获取分类数据
			this.getParentCateList();
			this.addCateDialogVisible = true;
		},
		// 获取父级分类数据
		async getParentCateList() {
			const { data: res } = await this.$http.get("categories", {params: { type: 2 }});
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取父级分类数据失败");
			}
			//获取成功
			this.parentCateList = res.data;
		}
	}
};
</script>

<style lang="scss" scoped></style>
