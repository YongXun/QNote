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
		<div class="rightAside">
			<div class="loginBox">
				<h2 style="color:#353b48;">QNote</h2>
				<router-view></router-view>
			</div>
			<footer class="loginBoxChoose">
					<router-link to="/login/signin">用户登录</router-link>
					<strong> | </strong>
					<router-link to="/login/register">用户注册</router-link>
			</footer>
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

	.leftAside{
		height: 100%;
		transition: .5s linear;
	}

	.outer {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(47, 54, 64, .8);
	}

	.motto,.mottoFrom{
		width: 80%;
	}

	.rightAside{
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 100%;
		background:rgba(245, 246, 250,.8);
	}

	.loginBox{
		position: absolute;
		width: 100%;
		height: 50%;
	}

	.loginBoxChoose{
		position: absolute;
		bottom: 20px;
	}

	.loginBoxChoose a,
	.loginBoxChoose strong {
		text-decoration: none;
		color: #353b48;
	}

	.loginBoxChoose .router-link-active{
		color:#c23616;
	}
</style>