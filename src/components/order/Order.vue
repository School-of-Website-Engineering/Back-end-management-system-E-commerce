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
		<el-card>
			<el-row>
				<el-col :span="8">
					<el-input placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
			</el-row>
			<!-- 订单列表数据 -->
			<br />
			<el-table :data="orderlist" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="订单编号" prop="order_number"></el-table-column>
				<el-table-column label="订单价格" prop="order_price"></el-table-column>
				<el-table-column label="是否付款" prop="pay_status">
					<template v-slot="scope">
						<el-tag v-if="scope.row.pay_status == 1" type="success"
							>已付款</el-tag
						>
						<el-tag v-else type="danger">未付款</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="是否发货" prop="is_send"></el-table-column>
				<el-table-column label="下单时间" prop="create_time">
					<template v-slot="scope">
						{{ scope.row.create_time | dateFormat }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template v-solt="scope">
						<!-- 带图标的button -->
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
						></el-button>
						<el-button
							type="success"
							icon="el-icon-location"
							size="mini"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<br />
			<el-pagination
				background
				:current-page="queryInfo.pagenum"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			queryInfo: {
				query   : "",
				pagenum : 1,
				pagesize: 10
			},
			total    : 0,
			orderlist: []
		};
	},
	methods: {
		async getOrderList() {
			const { data: res } = await this.$http.get("orders", {params: this.queryInfo});
			//获取数据失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取订单列表失败");
			}
			//获取数据成功
			this.orderlist = res.data.goods;
			this.total = res.data.total;
		},
		//页码改变
		handleSizeChange(newSize) {
			this.queryInfo.pagesize = newSize;
			this.getOrderList();
		},
		//每页条数改变
		handleCurrentChange(newPage) {
			this.queryInfo.pagenum = newPage;
			this.getOrderList();
		}
	},
	mounted() {
		this.getOrderList();
	}
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__cell {
	text-align: center;
}
</style>
