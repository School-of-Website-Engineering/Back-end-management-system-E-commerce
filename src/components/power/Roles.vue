<template>
	<div>
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>角色管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--卡片视图区-->
		<br />
		<el-card>
			<el-row>
				<el-button type="primary">添加角色</el-button>
			</el-row>
			<!--角色列表-->
			<br />
			<el-table :data="roleList" border stripe>
				<el-table-column type="expand">
					<!-- // 展开行模板 -->
					<template v-slot="scope">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-row
								v-for="(item1, i1) in scope.row.children"
								:key="item1.id"
								:class="['bdbottom', i1 === 0 ? 'bdtop' : '']"
							>
								<!-- 一级权限 -->
								<el-col :span="5">
									<el-tag> {{ item1.authName }}</el-tag>
									<i class="el-icon-arrow-right"></i>
								</el-col>

								<!-- 二、三级权限 -->
								<el-col :span="19">
									<el-row
										v-for="(item2, i2) in item1.children"
										:key="item2.id"
										:class="[i2 === 0 ? '' : 'bdtop']"
									>
										<el-col>
											<el-tag type="success"> {{ item2.authName }}</el-tag>
											<i class="el-icon-arrow-right"></i>
										</el-col>
										<el-col></el-col>
									</el-row>
								</el-col>
							</el-row>
						</el-form>
					</template>
				</el-table-column>
				<!-- 索引列 -->
				<el-table-column prop="id" label="ID" width="100"></el-table-column>
				<el-table-column prop="roleName" label="角色名称"></el-table-column>
				<el-table-column prop="roleDesc" label="角色描述"></el-table-column>
				<el-table-column label="操作" width="180">
					<template v-slot="{}">
						<el-button type="text" size="small">分配权限</el-button>
						<el-button type="text" size="small">编辑</el-button>
						<el-button type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//角色列表数据
			roleList: [],
		};
	},
	created() {
		//获取角色列表数据
		this.getRoleList();
	},
	methods: {
		//获取角色列表数据
		async getRoleList() {
			//发送请求
			const { data: res } = await this.$http.get("roles");
			//判断是否获取成功
			if (res.meta.status !== 200) {
				return this.$message.error("获取角色列表失败");
			}
			//获取成功
			this.roleList = res.data;
		},
	},
};
</script>

<style scoped lang="scss">
.el-tag {
	margin: 7px 7px 7px 30px;
}
.bdtop {
	border-top: 1px solid #eee;
}
.bdbottom {
	border-bottom: 1px solid #eee;
}
</style>
