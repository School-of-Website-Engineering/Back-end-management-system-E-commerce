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
					<el-button
						type="primary"
						size="mini"
						:disabled="isBtnDisabled"
						@click="addDialogVisible = true"
						>添加参数</el-button
					>
					<br />
					<br />
					<!-- 动态参数表格 -->
					<el-table :data="manyTableData" border stripe>
						<!-- 展开行 -->
						<el-table-column type="expand">
							<template v-slot="scope">
								<!-- 循环渲染tag -->
								<el-tag
									closable
									type=""
									v-for="(item, i) in scope.row.attr_vals"
									:key="i"
									@close="handleClose(i, scope.row)"
									>{{ item }}</el-tag
								>
								<!-- 输入 -->
								<el-input
									class="input-new-tag"
									v-if="scope.row.inputVisible"
									v-model.trim="scope.row.inputValue"
									ref="saveTagInput"
									size="small"
									@keyup.enter.native="handleInputConfirm(scope.row)"
									@blur="handleInputConfirm(scope.row)"
								>
								</el-input>
								<el-button
									v-else
									class="button-new-tag"
									size="small"
									@click="showInput(scope.row)"
									>+ New Tag</el-button
								>
							</template>
						</el-table-column>
						<!-- 索引列 -->
						<el-table-column type="index" label="#"></el-table-column>
						<el-table-column
							label="参数名称"
							prop="attr_name"
						></el-table-column>
						<el-table-column label="操作">
							<template v-slot="scope">
								<el-button
									type="primary"
									size="mini"
									icon="el-icon-edit"
									@click="showEditDialog(scope.row.attr_id)"
									>编辑</el-button
								>
								<el-button
									type="danger"
									size="mini"
									icon="el-icon-delete"
									@click="removeParams(scope.row.attr_id)"
									>删除</el-button
								>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="静态属性" name="only">
					<el-button
						type="primary"
						size="mini"
						:disabled="isBtnDisabled"
						@click="addDialogVisible = true"
						>添加属性</el-button
					>
					<br />
					<br />
					<!-- 静态表格 -->
					<el-table :data="onlyTableData" border stripe>
						<!-- 展开行 -->
						<el-table-column type="expand">
							<template v-slot="scope">
								<!-- 循环渲染tag -->
								<el-tag
									closable
									type=""
									v-for="(item, i) in scope.row.attr_vals"
									:key="i"
									@close="handleClose(i, scope.row)"
									>{{ item }}</el-tag
								>
								<!-- 输入 -->
								<el-input
									class="input-new-tag"
									v-if="scope.row.inputVisible"
									v-model.trim="scope.row.inputValue"
									ref="saveTagInput"
									size="small"
									@keyup.enter.native="handleInputConfirm(scope.row)"
									@blur="handleInputConfirm(scope.row)"
								>
								</el-input>
								<el-button
									v-else
									class="button-new-tag"
									size="small"
									@click="showInput(scope.row)"
									>+ New Tag</el-button
								>
							</template>
						</el-table-column>
						<!-- 索引列 -->
						<el-table-column type="index" label="#"></el-table-column>
						<el-table-column
							label="属性名称"
							prop="attr_name"
						></el-table-column>
						<el-table-column label="操作">
							<template v-slot="scope">
								<el-button
									type="primary"
									size="mini"
									icon="el-icon-edit"
									@click="showEditDialog(scope.row.attr_id)"
									>编辑</el-button
								>
								<el-button
									type="danger"
									size="mini"
									icon="el-icon-delete"
									@click="removeParams(scope.row.attr_id)"
									>删除</el-button
								>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</el-card>
		<!-- 添加参数对话框 -->
		<el-dialog
			:title="`添加${title}`"
			:visible.sync="addDialogVisible"
			width="50%"
			@close="addDialogClosed"
		>
			<el-form
				:model="addForm"
				:rules="addFormRules"
				ref="addFormRef"
				label-width="100px"
			>
				<el-form-item :label="title" prop="attr_name">
					<el-input v-model="addForm.attr_name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addParams">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改参数对话框 -->
		<el-dialog
			:title="`修改${title}`"
			:visible.sync="editDialogVisible"
			width="50%"
			@close="editDialogClosed"
		>
			<el-form
				:model="editForm"
				:rules="editFormRules"
				ref="editFormRef"
				label-width="100px"
			>
				<el-form-item :label="title" prop="attr_name">
					<el-input v-model="editForm.attr_name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editParams">确 定</el-button>
			</span>
		</el-dialog>
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
			SelectedCateKeys : [],
			// 被激活的tab页签的名称
			activeName       : "many",
			//动态数据table
			manyTableData    : [],
			//静态数据table
			onlyTableData    : [],
			// 添加参数对话框的显示与隐藏
			addDialogVisible : false,
			//添加参数的表单数据对象
			addForm          : { attr_name: "" },
			//添加参数的表单校验规则对象
			addFormRules     : {attr_name: [{ required: true, message: "请输入参数名称", trigger: "blur" }]},
			// 修改参数对话框的显示与隐藏
			editDialogVisible: false,
			//修改参数的表单数据对象
			editForm         : { attr_name: "" },
			//修改参数的表单校验规则对象
			editFormRules    : {attr_name: [{ required: true, message: "请输入参数名称", trigger: "blur" }]}
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
			res.data.forEach((item) => {
				item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : [];
				//控制文本框的显示与隐藏
				item.inputVisible = false;
				//控制文本框的值
				item.inputValue = "";
			});
			//获取成功,判断是动态参数还是静态属性
			if (this.activeName === "many") {
				this.manyTableData = res.data;
			}
			else {
				this.onlyTableData = res.data;
			}
		},
		//监听添加参数对话框关闭事件
		addDialogClosed() {
			//重置表单
			this.$refs.addFormRef.resetFields();
		},
		//点击按钮添加参数
		addParams() {
			//校验表单
			this.$refs.addFormRef.validate(async(valid) => {
				if (!valid) {
					return;
				}
				//校验通过，发送请求
				const { data: res } = await this.$http.post(
					`categories/${this.cateId}/attributes`,
					{
						attr_name: this.addForm.attr_name,
						attr_sel : this.activeName
					}
				);
				//添加失败
				if (res.meta.status !== 201) {
					return this.$message.error("添加参数失败");
				}
				//添加成功
				this.$message.success("添加参数成功");
				//关闭对话框
				this.addDialogVisible = false;
				//重新获取参数列表数据
				await this.getParamsData();
			});
		},
		//点击按钮，展示修改的对话框
		async showEditDialog(attrid) {
			//查询当前的参数信息
			const {data: res} = await this.$http.get(
				`categories/${this.cateId}/attributes/${attrid}`,
				{ params: { attr_sel: this.activeName } }
			);
			//查询失败
			if (res.meta.status !== 200) {
				return this.$message.error("查询参数信息失败");
			}
			//查询成功
			this.editForm = res.data;
			//展示对话框
			this.editDialogVisible = true;
		},
		//监听修改参数对话框关闭事件
		editDialogClosed() {
			//重置表单
			this.$refs.editFormRef.resetFields();
		},
		//点击按钮，修改参数
		editParams() {
			//校验表单
			this.$refs.editFormRef.validate(async(valid) => {
				if (!valid) {
					return;
				}
				//校验通过，发送请求
				const {data: res} = await this.$http.put(
					`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
					{ attr_name: this.editForm.attr_name, attr_sel: this.activeName }
				);
				//修改失败
				if (res.meta.status !== 200) {
					return this.$message.error("修改参数失败");
				}
				//修改成功
				this.$message.success("修改参数成功");
				//关闭对话框
				this.editDialogVisible = false;
				//重新获取参数列表数据
				await this.getParamsData();
			});
		},
		//点击按钮，删除参数
		async removeParams(attrid) {
			//提示用户是否删除
			const confirmResult = await this.$confirm(
				"此操作将永久删除该参数, 是否继续?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText : "取消",
					type             : "warning"
				}
			);
			//用户取消删除
			if (confirmResult === "cancel") {
				return this.$message.info("已取消删除");
			}
			//用户确认删除，发送请求
			const {data: res} = await this.$http.delete(
				`categories/${this.cateId}/attributes/${attrid}`,
				{ params: { attr_sel: this.activeName } }
			);
			//删除失败
			if (res.meta.status !== 200) {
				return this.$message.error("删除参数失败");
			}
			//删除成功
			this.$message.success("删除参数成功");
			//重新获取参数列表数据
			await this.getParamsData();
		},
		//文本框失去焦点，或摁下了 Enter都会触发
		async handleInputConfirm(row) {
			if (row.inputValue.trim().length === 0) {
				row.inputValue = "";
				row.inputVisible = false;
				return;
			}
			row.attr_vals.push(row.inputValue.trim());
			row.inputValue = "";
			row.inputVisible = false;
			await this.saveAttrValue(row);
		},
		//点击按钮，展示文本输入框
		showInput(row) {
			row.inputVisible = true;
			//获取焦点
			this.$nextTick(() => {
				this.$refs.saveTagInput.$refs.input.focus();
			});
		},
		//将对attr_vals的操作，保存到数据库
		async saveAttrValue(row) {
			//发送请求，修改参数的值
			const { data: res } = await this.$http.put(
				`categories/${this.cateId}/attributes/${row.attr_id}`,
				{
					attr_name: row.attr_name,
					attr_sel : row.attr_sel,
					attr_vals: row.attr_vals.join(",")
				}
			);
			//修改失败
			if (res.meta.status !== 200) {
				return this.$message.error("修改参数值失败");
			}
			//修改成功
			this.$message.success("修改参数值成功");
		},
		//点击按钮，删除参数值
		async handleClose(i, row) {
			row.attr_vals.splice(i, 1);
			//发送请求，修改参数的值
			await this.saveAttrValue(row);
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
		},
		//动态计算标题
		title() {
			return this.activeName === "many" ? "动态参数" : "静态属性";
		}
	}
};
</script>

<style scoped lang="scss">
.el-cascader {
	margin-left: 20px;
}

::v-deep .el-table .el-table__cell {
	text-align: center;
}
.el-tag {
	margin: 10px 20px;
}
.input-new-tag {
	width: 100px;
}
</style>
