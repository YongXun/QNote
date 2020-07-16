<template>
	<div class="registerForm">
		<main>
			<!-- 邮箱 -->
			<div class="inputEmail">
				<input v-model="email" @blur="checkEmail" class="inputLine-Email" type="text" placeholder="请输入您的邮箱" autocomplete="off">
				<button :class="{'sendEmail':true,'sendEmail-active':emailValid}" @click="sendEmail">发送验证</button>
			</div>
			<!-- 用户名 -->
			<div class="inputBar inputUsername">
				<i class="icon iconfont icon-dingbudaohang-zhangh"></i>
				<input v-model="username" @keyup="usernameValidate" class="inputLine " type="text" placeholder="请输入您的用户名" autocomplete="off">
				<i class="icon iconfont icon-qingchu1" @click="clearUsername"></i>
			</div>
			<!-- 密码 -->
			<div class="inputBar inputPassword">
				<i @click="changeVisiable" :class="{'icon':true,'iconfont':true,'icon-zhengyan':!passwordVisiable,'icon-biyan':passwordVisiable}"></i>
				<input v-model="password" @keyup="passwordValidate" class="inputLine "  :type="passwordVisiable?'text':'password'" placeholder="请输入您的密码">
				<i class="icon iconfont icon-qingchu1"  @click="clearPassword"></i>
			</div>
			<!-- 确认密码 -->
			<div class="inputBar inputConfirmPassword">
				<i @click="changeVisiable" :class="{'icon':true,'iconfont':true,'icon-zhengyan':!passwordVisiable,'icon-biyan':passwordVisiable}"></i>
				<input v-model="confirmPassword" @keyup="confirmPasswordValidate" class="inputLine "  :type="passwordVisiable?'text':'password'" placeholder="再次输入您的密码">
				<i class="icon iconfont icon-qingchu1"  @click="clearConfirmPassword"></i>
			</div>
			<!-- 验证码 -->
			<div class="inputBar inputVerification">
				<i @click="changeVisiable" class="icon iconfont icon-yanzhengma"></i>
				<input v-model="verification" @keyup="verificationValidate" class="inputLine "  :type="passwordVisiable?'text':'password'" placeholder="请输入您的验证码" autocomplete="off">
				<i class="icon iconfont icon-qingchu1"  @click="clearVerification"></i>
			</div>
			<footer>
			<span class="registerFormInfo">{{registerInfo}}</span>
			<br>
			<button @click="register" v-bind:class="{'formBtn':true,'formBtn-active':(emailValid&passwordValid&passwordValid&confirmPasswordValid&verificationValid)}"><i class="iconfont icon-icon-arrow-right4"></i></button>
		</footer>	
		</main>
	</div>
</template>

<style>
.inputEmail{
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
	overflow: hidden;
}
.inputLine-Email{
	width: 70%;
	height: 100%;
	line-height: 3em;
	font-size: 1em;
	color:#353b48;
	background: inherit;
	border:0;
}
.sendEmail{
	width:30%;
	font-size: 1em;
	background: #718093;
	border: 0;
}
.sendEmail-active{
	background: #00a8ff;
}
.registerFormInfo{
	width: 100%;
	height: 1em;
	line-height: 1em;
	text-align: center;
	font-size: 1em;
	color:#c23616;
}
</style>

<script>
	export default{
		data(){
			return{
				email:'',
				emailValid:false,
				username:'',
				usernameValid:false,
				password:'',
				passwordValid:false,
				confirmPassword:'',
				confirmPasswordValid:false,
				verification:'',
				verificationValid:false,
				passwordVisiable:false,
				registerInfo:'',
			}
		},
		methods:{
			clearUsername:function(){
				this.username = '';
				this.usernameValid = false;
			},
			clearPassword:function(){
				this.password = '';
				this.passwordValid = false;
			},
			clearConfirmPassword:function(){
				this.confirmPassword = '';
				this.confirmPasswordValid = false;
			},
			clearVerification:function(){
				this.verification = '',
				this.verificationValid = false;
			},
			checkEmail:async function(){
				//清空警告框
				this.rigisterInfo = '';
				//未输入邮箱
				if(!this.email){return;}
				//验证格式
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				this.emailValid = (reg.test(this.email))?true:false;
				this.registerInfo = this.emailValid?'':'邮箱格式有误';
				if(!this.emailValid){return;}
				//检验邮箱是否已经被注册
				await this.$http.post(`checkEmail`,{
					email:this.email,
				})
				.then(res=>{
					this.emailValid = res.data.valid?true:false;
					this.registerInfo = this.emailValid?'':'该邮箱已经被注册!';
				})
			},
			usernameValidate:function(){
				//清空警告框
				this.rigisterInfo = '';
				this.usernameValid = (this.username.length !== 0)?true:false;
				this.registerInfo = this.usernameValid?'':'请输入您的用户名';
			},
			passwordValidate:function(){
				//清空警告框
				this.rigisterInfo = '';
				let len = this.password.length;
				this.passwordValid = (len >= 6 & len <= 10)?true:false;
				this.registerInfo = this.passwordValid?'':'密码长度要求在6与10之间';
			},
			confirmPasswordValidate:function(){
				//清空警告框
				this.rigisterInfo = '';
				this.confirmPasswordValid = (this.confirmPassword === this.password)?true:false;
				this.registerInfo = this.confirmPasswordValid?'':'两次密码不一致';
			},
			verificationValidate:function(){
				//清空警告框
				this.rigisterInfo = '';
				this.verificationValid = (this.verification)?true:false;
				this.registerInfo = this.verificationValid?'':'请输入您的验证码'
			},
			changeVisiable:function(){
				//清空警告框
				this.rigisterInfo = '';
				this.passwordVisiable = !(this.passwordVisiable)
			},
			sendEmail:async function(){
				//密码格式验证通过才可以发送验证码
				if(!this.emailValid){return;}
				await this.$http.post(`sendEmail`,{
					email:this.email
				})
			},
			register:async function(){
				let valid = (this.emailValid&this.usernameValid&this.passwordValid&this.confirmPasswordValid&this.verificationValid);
				if(!valid){
					this.registerInfo = "请检查您的信息是否填写完成";
					return;
				}
				await this.$http.post(`register`,{
					email:this.email,
					username:this.username,
					password:this.password,
					verification:this.verification
				})
				.then(res=>{
					if(res.data.valid){
						//保存token值
						window.sessionStorage.setItem('token',res.data.token);
						//通过编程式导航跳转到后台主页,路由地址为home
						this.$router.push(`/home`);
					}
				}).catch(err=>{
					this.registerInfo = "验证码不匹配"
				})
			}
		}
	}
</script>