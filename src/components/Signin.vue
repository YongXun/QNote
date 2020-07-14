<template>
	<div class="loginForm">
		<main>
			<div class="inputBar inputEmail">
				<i class="icon iconfont icon-tubiao209"></i>
				<input v-model="email" @keyup="emailValidate" class="inputLine " type="text" placeholder="请输入您的邮箱" autocomplete="false">
				<i class="icon iconfont icon-qingchu1" @click="clearEmail"></i>
			</div>
			<br>
			<div class="inputBar inputPassword">
				<i @click="changeVisiable" :class="{'icon':true,'iconfont':true,'icon-zhengyan':!passwordVisiable,'icon-biyan':passwordVisiable}"></i>
				<input v-model="password" @keyup="passwordValidate" class="inputLine "  :type="passwordVisiable?'text':'password'" placeholder="请输入您的密码">
				<i class="icon iconfont icon-qingchu1"  @click="clearPassword"></i>
			</div>
		</main>
		<footer>
			<span class="loginFormInfo">{{loginInfo}}</span>
			<br>
			<button v-bind:class="{'formBtn':true,'formBtn-active':(emailValid&passwordValid)}" @click="signin"><i class="iconfont icon-icon-arrow-right4"></i></button>
		</footer>	
	</div>
 </template>

<style>
.inputBar{
	margin:5px auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 80%;
	text-align:center;
	height: 3em;
	line-height: 3em;
	font-size: 1em;
	color:#353b48;
	background: #dcdde1;
	border:solid 1px #fff;
	border-radius: 1.5em;
}
.icon{
	margin:0 10px;
	width:10%;
	font-size: 1.5em;
	color:#353b48;
}
.inputLine{
	width: 80%;
	height: 100%;
	line-height: 3em;
	font-size: 1em;
	color:#353b48;
	background: inherit;
	border:0;
}

.loginFormInfo{
	width: 100%;
	height: 1em;
	line-height: 1em;
	text-align: center;
	font-size: 1em;
	color:#c23616;
}

.formBtn{
	margin:10px auto;
	width: 50px;
	height: 50px;
	color: #353b48;
	background:#dcdde1;
	border: solid 1px #fff;
	border-radius: 25px;
	transition: .5s linear;
}

.formBtn-active{
	background:#00a8ff;
}

.formBtn i{
	color:#353b48;
}
</style>

<script>
export default{
	data(){
		return{
			email:'',
			password:'',
			emailValid:false,
			passwordValid:false,
			loginInfo:'',
			passwordVisiable:false
		}
	},
	methods:{		
		emailValidate:function(){
			//清空警告框
			this.loginInfo = '';
			//检查邮箱是否符合格式要求
			let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			this.emailValid = reg.test(this.email)?true:false;
		},
		passwordValidate:function(){
			//清空警告框
			this.loginInfo = '';
			//检查是否输入密码(密码默认长度大于6小于10)
			this.passwordValid = ((this.password.length >= 6) &  (this.password.length <= 10))?true:false;
		},
		clearEmail:function(){
			this.email = '';
			this.emailValid = false;
		},
		clearPassword:function(){
			this.password = '';
			this.passwordValid = false;
		},
		changeVisiable:function(){
			this.passwordVisiable = !(this.passwordVisiable)
		},
		signin:function(){
			if(!(this.emailValid&this.passwordValid)){return;}
			this.$http.post(`signin`,{
				email:this.email,
				password:this.password
			})
			.then(res=>{
				//保存token值	
				window.sessionStorage.setItem('token',res.data.token);
				//通过编程式导航跳转到后台主页,路由地址为home
				this.$router.push(`/home/${this.email}`);
			})
			.catch(err=>{
				this.loginInfo = `账号不存在或者密码错误!`;
			})
		}
	}
}
</script>