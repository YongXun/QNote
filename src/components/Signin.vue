<template>
	<!-- 登录表单区域 -->
	<!-- <form class='ui-input-box ui-logon-box' action="http://localhost:3000/signin" method='post'  @submit='signin'>
		<input type='text' class='ui-input' placeholder='请输入您的账号' v-model="username">
		<input type='password' class='ui-input' placeholder='请输入您的密码' v-model='password'>
		<input type='submit' class='ui-input-submit'  value='登录'>
	</form> -->
	<el-form  ref="loginFormRef" :model="loginForm" :rules="loginRule" label-width="80px">
		<!-- 用户名 -->
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder='请输入您的用户名'></el-input>
		</el-form-item>
		<!-- 密码 -->
		<el-form-item prop="password">
			<el-input v-model="loginForm.password" type="password"  placeholder='请输入您的密码'></el-input>
		</el-form-item>
		<!-- 按钮 -->
		<el-form-item>
			<el-button type="primary" @click='signin()'>登录</el-button>
			<el-button type="info" @click='clear()'>重置</el-button>
		</el-form-item>
	</el-form>
</template>

<style>
	.el-form{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width:100%;
		height:45%;
	}
	.el-form-item{
		width:80%;
		border:0;
	}
	.el-input{
		text-align: center;
		font-size: 1.5em!important;
	}
	.el-inpiut input{
		border:0;
	}
	.el-form-item__content{
		margin:0 auto!important;
	}
</style>

<script>
	export default{
		data(){
			return{
				loginForm:{
					username:'',
					password:''
				},
				loginRule:{
					username:[
						{required:true,message:"请输入您的用户名",trigger:"blur"},
						{min:6,max:10,message:"用户名长度在6与10之间",trugger:"blur"}
					],
					password:[
						{required:true,message:"请输入您的密码",trigger:"blur"},
						{min:6,max:10,message:"密码长度在6与10之间",trugger:"blur"}
					]
				}
			}
		},
		methods:{
			clear:function(){
				this.loginForm.username = '';
				this.loginForm.password = '';
			},
			signin:function(){
				this.$refs.loginFormRef.validate(async(valid)=>{
					if(!valid){return};
					await this.$http.post('signin',this.loginForm)
					.then((res)=>{
						console.log(res.data,res.status);
						this.$message.success('登录成功');
						//保存token值
						window.sessionStorage.setItem('token',res.data.token);
						//通过编程式导航跳转到后台主页,路由地址为home
						this.$router.push(`/home/${this.loginForm.username}`);
					})
					.catch((err)=>{
						if(err.response.status === 401){return this.$message.error('账号不存在或者密码错误');}
						else{return this.$message.error('未能成功访问服务器');}
					})
				})
		},
		}
	}
</script>