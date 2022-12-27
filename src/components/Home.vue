<template>
	<div>
		<!--退出按钮-->
		<el-button type="danger" @click="logout">退出</el-button>
	</div>
</template>

<script>
export default {
	name   : "Home",
	methods: {
		//	退出登录
		logout(){
			window.sessionStorage.clear()
			this.$router.push("/login")
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
