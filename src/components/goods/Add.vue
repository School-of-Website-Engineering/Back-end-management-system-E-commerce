<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<br />
		<el-card>
			<el-alert
				title="添加商品信息"
				type="info"
				center
				show-icon
				:closable="false"
			>
			</el-alert>
			<!-- 步骤条 -->
			<br />
			<el-steps
				:space="200"
				:active="activeIndex - 0"
				finish-status="success"
				align-center
			>
				<el-step title="基本信息"></el-step>
				<el-step title="商品参数"></el-step>
				<el-step title="商品属性"></el-step>
				<el-step title="商品图片"></el-step>
				<el-step title="商品内容"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<!-- tab栏 -->
			<br />
			<el-form
				:model="addForm"
				:rules="addFormRules"
				ref="addFormRef"
				label-width="100px"
				label-position="top"
			>
				<el-tabs
					v-model="activeIndex"
					:tab-position="'left'"
					:before-leave="beforeTabLeave"
					@tab-click="tabClicked"
				>
					<el-tab-pane label="基本信息" name="0">
						<el-form-item label="商品名称" prop="goods_name">
							<el-input v-model="addForm.goods_name"></el-input>
						</el-form-item>
						<el-form-item label="商品价格" prop="goods_price">
							<el-input v-model="addForm.goods_price" type="number"></el-input>
						</el-form-item>
						<el-form-item label="商品重量" prop="goods_weight" type="number">
							<el-input v-model="addForm.goods_weight"></el-input>
						</el-form-item>
						<el-form-item label="商品数量" prop="goods_number" type="number">
							<el-input v-model="addForm.goods_number"></el-input>
						</el-form-item>
						<el-form-item label="商品分类" prop="goods_cat">
							<el-cascader
								v-model="addForm.goods_cat"
								:options="cateList"
								:props="{ expandTrigger: 'hover', ...cateProps }"
								@change="handleChange"
							></el-cascader>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品参数" name="1">
						<!--渲染表单的Item项-->
						<el-form-item
							v-for="item in manyTableData"
							:key="item.attr_id"
							:label="item.attr_name"
						>
							<!-- 复选框组 -->
							<el-checkbox-group v-model="item.attr_vals">
								<el-checkbox
									:label="cb"
									v-for="(cb, i) in item.attr_vals"
									:key="i"
									border
								></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
					<el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
					<el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-card>
		<br />
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeIndex: 0,
			// 表单数据
			addForm    : {
				goods_name        : "",
				goods_price       : "",
				goods_number      : "",
				goods_weight      : "",
				goods_cat         : [],
				goods_state       : "",
				goods_is_promote  : "",
				promote_start_date: "",
				promote_end_date  : "",
				goods_img         : "",
				goods_imgs        : [],
				goods_content     : ""
			},
			// 表单验证规则
			addFormRules: {
				goods_name  : [{ required: true, message: "请输入商品名称", trigger: "blur" }],
				goods_price : [{ required: true, message: "请输入商品价格", trigger: "blur" }],
				goods_number: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
				goods_weight: [{ required: true, message: "请输入商品重量", trigger: "blur" }],
				goods_cat   : [{ required: true, message: "请选择商品分类", trigger: "change" }]
			},
			// 商品分类列表数据
			cateList : [],
			cateProps: {
				label   : "cat_name",
				value   : "cat_id",
				children: "children"
			},
			//动态参数列表数据
			manyTableData: [],
			//静态属性列表数据
			onlyTableData: []
		};
	},
	methods: {
		//获取所有分类
		async getCateList() {
			const res = await this.$http.get("categories");
			if (res.data.meta.status !== 200) {
				return this.$message.error("获取分类列表失败");
			}
			this.cateList = res.data.data;
		},
		//级联选择器的change事件
		handleChange() {
			if (this.addForm.goods_cat.length !== 3) {
				this.$message.error("请选择三级分类");
				this.addForm.goods_cat = [];
			}
		},
		beforeTabLeave(activeName, oldActiveName) {
			if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
				this.$message.error("请选择三级分类");
				return false;
			}
		},
		async tabClicked() {
			if (this.activeIndex === "1") {
				const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: { sel: "many" }});

				//获取失败
				if (res.meta.status !== 200) {
					return this.$message.error("获取商品参数失败");
				}
				res.data.forEach((item) => {
					item.attr_vals =
						item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
				});
				this.manyTableData = res.data;
			}
			else if (this.activeIndex === "2") {
				const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: { sel: "only" }});

				//获取失败
				if (res.meta.status !== 200) {
					return this.$message.error("获取静态属性失败");
				}
				res.data.forEach((item) => {
					item.attr_vals =
						item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
				});
				this.onlyTableData = res.data;
			}
		}
	},
	mounted() {
		this.getCateList();
	},
	computed: {
		cateId() {
			if (this.addForm.goods_cat.length === 3) {
				return this.addForm.goods_cat[2];
			}
			return null;
		}
	}
};
</script>

<style lang="scss" scoped></style>
