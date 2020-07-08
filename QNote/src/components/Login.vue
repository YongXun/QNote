<template>
	<div class="wrapper">
		<div class="login-box">
			<header class="login-box-title">
				<router-link to="/login/signin">登录</router-link>
				<strong> | </strong>
				<router-link to="/login/register">注册</router-link>
			</header>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Signin from './Signin.vue'
	import Register from './Register.vue'
	export default{
		data(){
			return{
			}
		},
		components:{
			Signin,
			Register
		}
	}
</script>

<style>
	.wrapper {
	    width: 100%;
	    height: 100%;
		overflow: scroll;
	}
	.login-box {
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: space-around;
	    width: 800px;
	    height: 400px;
	    background: #fff;
	    opacity: .8;
		border-radius: 20px;
	    transform: translate(-50%, -50%);
	}
	.login-box-title a,
	.login-box-title strong {
	    font-size: 2em;
	    text-decoration: none;
	    color: #353b48;
	}
</style>