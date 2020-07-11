<template>
	<el-form  class="registerForm" ref="registerFormRef" :model="registerForm" :rules="registerFormRule" label-width="80px">
		<!-- 邮箱 -->
		<el-form-item prop="email">
			<el-input class="text" v-model="registerForm.email" placeholder="请输入您的邮箱"></el-input>
		</el-form-item>
		<!-- 用户名 -->
		<el-form-item prop="username">
			<el-input v-model="registerForm.username" placeholder="请输入您的用户名"></el-input>
		</el-form-item>
		<!-- 密码 -->
		<el-form-item prop="password">
			<el-input v-model="registerForm.password" type="password" placeholder="请输入您的密码"></el-input>
		</el-form-item>
		<!-- 确认密码 -->
		<el-form-item prop="confirmPassword">
			<el-input v-model="registerForm.confirmPassword" type="password" placeholder="请确认您的密码"></el-input>
		</el-form-item>
		<!-- 验证码 -->
		<el-form-item prop="ver">
			<el-input v-model="registerForm.ver" placeholder="请输入您的验证码"></el-input>
		</el-form-item>
		<!-- 按钮 -->
		<el-form-item>
			<el-button type="info" @click='sendEmail()'>获取验证码</el-button>
			<el-button type="info" @click='register()'>注册</el-button>
		</el-form-item>
	</el-form>
</template>

<style>
	.registerForm{
		height:60%;
	}
</style>

<script>
	import axios from 'axios'
	export default{
		data(){
			// 邮箱验证
			let checkEmail = async (rule,value,callback) =>{
				if(value.length === 0){return callback(new Error('请输入您的邮箱'));}
				//检查邮箱格式是否正确
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(!reg.test(value)){
					return callback(new Error('邮箱格式不正确'));
				}
				// 验证邮箱是否已经被注册
				await axios.post(`checkEmail`,{email:value})
				.then(result=>{
					console.log(result.data.valid);
					if(!result.data.valid){
						return callback(new Error(`该邮箱已经被注册`));
					}
				}).catch(result=>{
					console.log('nothing');
				})
			}
			let checkUsername = async (rule,value,callback)=>{
				//检测是否输入用户名
				if(value.length === 0){return callback(new Error('请输入您的用户名'));}
				//检测用户名长度是否合法
				if(value.length>10){return callback(new Error('用户名长度不得大于10'))}
			}
			let checkPassword = (rule,value,callback)=>{
				//检测是否输入密码
				if(value.length === 0){return callback(new Error('请输入您的密码'));}
				//检测密码长度是否符合要求
				if(value.length < 6 || value.length >10){
					return callback(new Error('密码长度在6与10之间'));
				}
			}
			let checkConfirm = (rule,value,callback)=>{
				//检测是否再次输入密码
				if(value.length === 0){return callback(new Error('请再次输入您的密码'));}
				//检测是否两次都输入相同的密码
				if(value !== this.registerForm.password){
					return callback(new Error('两次密码不一致'));
				}
			}
			return{
				registerForm:{
					email:'',
					username:'',
					password:'',
					confirmPassword:'',
					ver:''
				},
				registerFormRule:{
					email:[
						{validator:checkEmail,trugger:'blur'}
					],
					username:[
						{validator:checkUsername,trugger:'blur'}
					],
					password:[
						{validator:checkPassword,trugger:'blur'}
					],
					confirmPassword:[
						{validator:checkConfirm,trugger:'blur'}
					]
				}
			}
		},
		methods:{
			sendEmail:async function(){
				this.$refs.registerFormRef.validate(async(valid)=>{
					//检测四项基本信息是否填写好
					if(!valid){return this.$message.error('请先填写好您的信息!')};
					await axios.post(`sendEmail`,{
						email:email
					}).then(result=>{
						console.log(result.data.send);
						if(result.data.send){
							this.$message.success('已经向您的邮箱发送验证码!')
						}
						else{
							this.$message.suceess('很抱歉,发送失败!')
						}
					})
					})
			},
			register:function(){
				this.$refs.registerFormRef.validate(async(valid)=>{
					//检测四项基本信息是否填写好
					if(!valid){return this.$message.error('请按照要求填写有效信息!')};
					//检测是否输入了验证码
					if(!registerForm.ver){return this.$message.error('请输入您的邮箱验证码!')}
					await this.$http.post('register',{
						email:this.registerForm.email,
						password:this.registerForm.password,
						username:this.registerForm.username,
						ver:this.registerForm.ver
					})
					.then((res)=>{
						if(res.data.valid){
							this.$message.success('注册成功');
							//保存token值
							window.sessionStorage.setItem('token',res.data.token);
							//通过编程式导航跳转到后台主页,路由地址为home
							this.$router.push(`/home/${this.registerForm.email}`);
						}
						else{
							return this.$message.error('验证失败,请检查您的验证码');
						}		
					})
					.catch((err)=>{
						return this.$message.error('未能成功访问服务器,注册失败!');
					})
				})
			}
		},
		props:[]
	}
</script>