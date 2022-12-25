<template>
	<div class="login-container">
		<div class="login-box">
			<div class="avatar-box">
				<img src="../assets/logo.png" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
export default { name: "Login" };
</script>

<style lang="scss" scoped>
//登录组件背景颜色
.login-container {
	background-color: #2b4b6b;
	height: 100vh;
}
//登录盒子居中
.login-box {
	width: 500px;
	height: 500px;
	background-color: #fff;
	border-radius: 5px;
	//定位居中
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	.avatar-box {
		height: 130px;
		width: 130px;
		padding: 12px;
		border-radius: 50%;
		border: 1px solid #ccc;
		background-color: #fff;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		img {
			height: 100%;
			width: 100%;
			border-radius: 50%;
			background-color: #eee;
		}
	}
}
</style>
