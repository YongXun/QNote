<template>
	<div class="wrapper">
		<div class="leftAside">
			<div class="outer">
				<span class="motto">{{motto.hitokoto}}</span>
				<br>
				<span class="mottoFrom">{{`——${motto.from_who?motto.from_who:''}《${motto.from}》`}}</span>
				<div class="hideMottoBtn" @click="hideMotto">进入QNote</div>
			</div>
		</div>
		<div class="login-box">
			<header class="login-box-title">
				<router-link to="/login/signin">登录</router-link>
				<strong> / </strong>
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
		mounted:async function(){
			await this.$http(`motto`)
			.then(result=>{
				this.motto = result.data;
			})
			.catch(result=>{})
		},
		data(){
			return{
				motto:'会有那么一天!'
			}
		},
		methods:{
			hideMotto:function(){
				document.querySelector('.leftAside').style.top = '-100%';
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
		display: flex;
		flex-direction: row;
	    width: 100%;
	    height: 100%;
		overflow: scroll;
	}
	.login-box {
		width: 25%;
		height: 100%;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	    background: rgba(220, 221, 225,.6);
	}
	.login-box-title a,
	.login-box-title strong {
	    font-size: 2em;
	    text-decoration: none;
	    color: #353b48;
	}
	.el-button{
		background: #2f3640;
		border: 0;
	}
	.el-button:hover{
		background: #dcdde1;
	}
</style>