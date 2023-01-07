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
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<!-- 添加商品按钮 -->
					<el-button type="primary" icon="el-icon-plus">
						添加商品
					</el-button>
				</el-col>
			</el-row>
			<!-- table表格区域 -->
			<el-table :data="goodsList" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="goods_name" label="商品名称"></el-table-column>
				<el-table-column
					prop="goods_price"
					label="商品价格(元)"
					width="90px"
				></el-table-column>
				<el-table-column prop="goods_number" width="90px" label="商品数量"></el-table-column>
				<el-table-column prop="goods_weight" width="90px" label="商品重量"></el-table-column>
				<el-table-column prop="goods_state" width="90px" label="商品状态"></el-table-column>
				<el-table-column prop="add_time" label="添加时间" width="160px">
					<template v-slot="scope">
						{{ scope.row.add_time | dateFormat }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="140">
					<template v-slot="scope">
						<el-button type="text" size="small">编辑</el-button>
						<el-button type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<br>
			<el-pagination
				background
				:current-page="queryInfo.pagenum"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//查询参数
			queryInfo: {
				query   : "",
				pagenum : 1,
				pagesize: 10
			},
			//商品列表数据
			goodsList: [],
			//总条数
			total    : 0
		};
	},
	methods: {
		async getGoods() {
			const { data: res } = await this.$http.get("goods", {params: this.queryInfo});
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取商品列表失败！");
			}
			//获取成功
			this.$message.success("获取商品列表成功！");
			this.goodsList = res.data.goods;
			this.total = res.data.total;
		}
	},
	mounted() {
		this.getGoods();
	}
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__cell {
	text-align: center;
}
</style>
