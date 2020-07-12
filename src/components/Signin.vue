<template>
	<el-form  class='signinForm' ref="loginFormRef" :model="loginForm" :rules="loginRule" label-width="80px">
		<!-- 用户名 -->
		<el-form-item prop="email">
			<el-input v-model="loginForm.email" placeholder='请输入您的邮箱'></el-input>
		</el-form-item>
		<!-- 密码 -->
		<el-form-item prop="password">
			<el-input v-model="loginForm.password" type="password"  placeholder='请输入您的密码'></el-input>
		</el-form-item>
		<!-- 按钮 -->
		<el-form-item>
			<el-button type="info" @click='signin()'>登录</el-button>
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
	.signinForm{
		height:35%;
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
			// 邮箱验证
			let checkEmail = async (rule,value,callback) =>{
				if(value.length === 0){return callback(new Error('请输入您的邮箱'));}
				//检查邮箱格式是否正确
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(!reg.test(value)){
					return callback(new Error('邮箱格式不正确'));
				}
				callback();
			}
			let checkPassword = (rule,value,callback)=>{
				//检测是否输入密码
				if(value.length === 0){return callback(new Error('请输入您的密码'));}
				//检测密码长度是否符合要求
				if(value.length < 6 || value.length >10){
					return callback(new Error('密码长度在6与10之间'));
				}
				callback();
			}
			return{
				loginForm:{
					email:'',
					password:''
				},
				loginRule:{
					email:[
						{validator:checkEmail,trugger:'blur'}
					],
					password:[
						{validator:checkPassword,trugger:'blur'}
					],
				}
			}
		},
		methods:{
			clear:function(){
				this.loginForm.email = '';
				this.loginForm.password = '';
			},
			signin:function(){
				this.$refs.loginFormRef.validate(async(valid)=>{
					if(!valid){return};
					await this.$http.post('signin',this.loginForm)
					.then((res)=>{
						this.$message.success('登录成功');
						//保存token值	
						window.sessionStorage.setItem('token',res.data.token);
						//通过编程式导航跳转到后台主页,路由地址为home
						this.$router.push(`/home/${this.loginForm.email}`);
					})
					.catch((err)=>{
						return this.$message.error('账号不存在或者密码错误!');
					})
				})
		},
		}
	}
</script>