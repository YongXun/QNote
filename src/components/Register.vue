<template>
	<!-- <div class='ui-input-box ui-register-box'>
		<input type='text' class='ui-input' placeholder='请输入您的账号'>
		<input type='password' class='ui-input' placeholder='请输入您的密码'>
		<input type='password' class='ui-input' placeholder='请再次输入您的密码'>
		<input type='submit' class='ui-input-submit' value='注册'>
	</div> -->
	<el-form  ref="registerFormRef" :model="registerForm" :rules="registerFormRule" label-width="80px">
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
			<el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入您的密码"></el-input>
		</el-form-item>
		<!-- 按钮 -->
		<el-form-item>
			<el-button type="primary" @click='register()'>注册</el-button>
			<el-button type="info" @click='clear()'>重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			let Mark = async (rule,value,callback)=>{
				//检测用户名长度是否合法
				if(value.length<6 || value.length>10){return callback(new Error('用户名长度在6与10之间'))}
				//检测用户名是否已经存在
				await axios.post(`registerName`,{username:value})
				.then(result=>{
					if(!result.data){
						return callback(new Error('该用户名已被注册!'));
					}
				})
				.catch(err=>{
					console.log(err);
				})
			}
			let confirm = (rule,value,callback)=>{
				if(value !== this.registerForm.password){
					return callback(new Error('两次密码不一致'));
				}
				return;
			}
			return{
				registerForm:{
					username:'',
					password:'',
					confirmPassword:'',
				},
				registerFormRule:{
					username:[
						{required:true,message:"请输入您的用户名",trigger:"blur"},
						{validator:Mark,trugger:'blur'}
					],
					password:[
						{required:true,message:"请输入您的密码",trigger:"blur"},
						{min:6,max:10,message:"密码长度在6与10之间",trugger:"blur"}
					],
					confirmPassword:[
						{required:true,message:"请再次输入您的密码",trigger:"blur"},
						{validator:confirm,trugger:'blur'}
					]
				}
			}
		},
		methods:{
			clear:function(){
				this.registerForm.username = '';
				this.registerForm.password = '';
				this.registerForm.confirmPassword = '';
			},
			register:function(){
				console.log('click');
				console.log(this.$refs.registerFormRef)
				this.$refs.registerFormRef.validate(async(valid)=>{
					console.log(valid)
					if(!valid){return this.$message.error('请按照要求填写有效信息!')};
					console.log('123');
					await this.$http.post('register',this.registerForm)
					.then((res)=>{
						console.log(res.data,res.status);
						this.$message.success('注册成功');
						//保存token值
						window.sessionStorage.setItem('token',res.data.token);
						//通过编程式导航跳转到后台主页,路由地址为home
						this.$router.push(`/home/${this.registerForm.username}`);
					})
					.catch((err)=>{
						console.log(err)
						return this.$message.error('未能成功访问服务器,注册失败!');
					})
				})
			}
		},
		props:[]
	}
</script>