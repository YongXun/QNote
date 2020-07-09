<template>
	<div class='homeWrapper'>
		<!-- <div class="welcome-page">
			<p class="welcome-info">欢迎!
			<span>{{username}}</span>
			<br>
			<span>点击下方按钮,开始今天的计划吧!</span>
			</p>
			<i class="iconfont icon-shang" @click='move()'></i>
		</div> -->
		<!-- <div class="user-info">
			<p>用户名:<span class='username'>{{username}}</span></p>
			<p>历史目标数:<span class='noteNum'>{{noteNum}}</span></p>
			<p>现有目标数:<span class='currentNoteNum'>{{currentNoteNum}}</span></p>
			<p>完成目标数:<span class='completeNoteNum'>{{completeNoteNum}}</span></p>
			<p>舍弃目标数:<span class='trashNoteNum'>{{giveUpNoteNum}}</span></p>
		</div> -->
		<!-- <div class="homeWrapper">
			<div class="container">
			<input type="text" class="txtb" placeholder="就是现在,立下你的小目标吧!(输入内容并按下回车)" @keyup.enter="addNote()"/>
			<h3>未完成目标</h3>
			<ul class="notcomp">
				<li  class="task" v-for="(value,index) in notcompNoteList" v-bind:key="index" :id="value.noteID">
					<span>{{value.noteContent}}</span>
					<div class='icon'>
						<i class="iconfont icon-check" @click='completeNote($event)'></i>
						<i class="iconfont icon-trash" @click='giveUpNote($event)'></i>
					</div>
				</li>
			</ul>
			<h3>已完成目标</h3>
			<ul class="comp">
				<li  class="task" v-for="(value,index) in compNoteList" v-bind:key="index" :id="value.noteID">
					<span>{{value.noteContent}}</span>
					<div class='icon'>
						<i class="iconfont icon-trash" @click='deleteNote($event)'></i>
					</div>
				</li>
			</ul>
		</div>
		</div> -->
		<div class="homeContainer">

		</div>
	</div>
</template>

<script>
import axios from 'axios'
	export default{
		mounted:function(){
			this.getMessage();
		},
		props:['username'],
		data(){
			return{
				noteNum:0,
				currentNoteNum:0,
				completeNoteNum:0,
				giveUpNoteNum:0,
				notcompNoteList:[],
				compNoteList:[]
			}
		},
		methods:{
			 getMessage:async function(){
				await this.$http.get(`user/getMessage`, {
					params: {
						token: sessionStorage.getItem('token')
					}
				})
				.then(result=>{
					// console.log(result);
					//更新用户数值
					this.noteNum = result.data.user.noteNum;
					this.currentNoteNum = result.data.user.currentNoteNum;
					this.giveUpNoteNum = result.data.user.giveUpNoteNum;
					this.completeNoteNum = result.data.user.completeNoteNum;
					//更新用户事务列表
					result.data.note.forEach(async value=>{
						let noteID = value.noteID;
						let noteContent = value.noteContent;
						if(value.done === false){
							this.notcompNoteList.push({noteID,noteContent});
						}
						else{this.compNoteList.push(value)};
					})
				})
				.catch(err=>console.log(err))
			},
		addNote:async function(){
			//获取输入信息
			let input = document.querySelector('input');
			let inputValue = input.value;
			//输入框信息重置
			input.value = "";
			//修改数据库信息
			await this.$http.post(`note/addTask`, {
					token: sessionStorage.getItem('token'),
					noteContent: inputValue
				})
			.then(result=>{
				console.log(inputValue)
				let noteID = result.data.noteID;
				//修改本地信息
				this.notcompNoteList.push({noteID,noteContent:inputValue});
				this.noteNum++;
				this.currentNoteNum++;
			}).catch(err=>{
				console.log(err);
				return this.$message.error('网络出错!');
			})
		},
		giveUpNote:async function(e){
			let noteID = e.target.parentElement.parentElement.id;
			//修改数据库
			await this.$http.post(`note/giveUpTask`,{
				token: sessionStorage.getItem('token'),
				username:this.username,
				noteID:noteID
			})
			.then(result=>{
				this.notcompNoteList.forEach((value,index,arr)=>{
					if(value.noteID.toString() === noteID){
						arr.splice(index,1);
					}
				})
				this.giveUpNoteNum++;
				this.currentNoteNum--;
			})
			.catch(err=>{
				console.log(err);
				return this.$message.error('网络出错!');
			})
		},
		completeNote:async function(e){
			let noteID = e.target.parentElement.parentElement.id;
			//修改数据库
			await this.$http.post(`note/completeTask`,{
				token: sessionStorage.getItem('token'),
				username:this.username,
				noteID:noteID
			}).then(result=>{
				this.notcompNoteList.forEach((value,index,arr)=>{
					if(value.noteID.toString() === noteID){
						this.compNoteList.push({noteID:noteID,noteContent:value.noteContent})
						arr.splice(index,1);
					}
				})
				this.completeNoteNum++;
				this.currentNoteNum--;
			})
			.catch(err=>{
				console.log(err);
				return this.$message.error('网络出错!');
			})
		},
		deleteNote:async function(e){
			let noteID = e.target.parentElement.parentElement.id;
				await this.$http.post(`note/deleteNote`,{
				token: sessionStorage.getItem('token'),
				username:this.username,
				noteID:noteID
			})
			.then(result=>{
				this.compNoteList.forEach((value,index,arr)=>{
					if(value.noteID.toString() === noteID){
						arr.splice(index,1);
					}
				})
			})
			.catch(err=>{
				console.log(err);
				return this.$message.error('网络出错!');
			})
		},
		move:function(){
			document.querySelector('.welcome-page').style.top = '-100%';
		}
	}
}
</script>

<style>
/* 背景 */
.homeWrapper{
	width: 100%;
	height: 100%;
	background:url(../../public/img/bg-home-desktop.jpg) center;
}
/* 欢迎页 */
.welcome-page{
	display: flex;
	flex-direction: column;
	position: absolute;
	top:0;
	left:0;
	width:100%;
	height: 100%;
	background-color: lightblue;
	transition: .4s linear;
}

.welcome-info{
	margin: auto;
	font-size: 3em;
}

.icon-shang{
	position: absolute;
	bottom:40px;
	left:45%;
	width: 50px;
	height: 50px;
	font-size:50px;
	animation-name: scaleDraw; /*关键帧名称*/
	animation-timing-function: ease-in-out; /*动画的速度曲线*/
	animation-iteration-count: infinite;  /*动画播放的次数*/
	animation-duration: 5s; /*动画所花费的时间*/
}

@keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
	0%{
		bottom:40px;
		transform: scale(1);  /*开始为原始大小*/
	}
	25%{
		bottom:80px;
		transform: scale(1.5); /*放大1.1倍*/
	}
	50%{
		bottom:40px;
		transform: scale(1);
	}
	75%{
		bottom:80px;
		transform: scale(1.5);
	}
}

/* 主区域 */
.homeContainer{
	width: 80%;
	height: 100%;
	background:rgba(245, 246, 250,.8);
	margin:0 auto;
}

/* 用户信息 */
.user-info{
	display: flex;
	flex-direction: column;
	width:20%;
	border:#fff solid 1px;
}

.user-info p{
	margin:0;
	width:100%;
	height:20px;
	line-height: 20px;
	font-size: 20px;
	border-bottom:solid 1px #fff;
}

.container{
	width:80%;
	height: 100%;
	margin: auto;
	padding: 10px;
	overflow:hidden;
	border:#fff solid 1px;
}
/* 任务列表 */
.txtb{
	width: 100%;
	border: none;
	border-bottom: solid 2px #000;
	background: none;
	padding: 10px;
	outline: none;
	font-size: 18px;
	text-align: center;
}

.notcomp,
.comp{
	display:flex;
	flex-direction: column;
	width:100%;
	height:40%;
	overflow:scroll;
	border:yellow solid 1px;
}

h3{
	margin: 10px 0;
}

.task{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width:100%;
	height: 50px;
	line-height: 50px;
	margin: 6px 0;
	background: rgba(245, 246, 250,.5);
	overflow: hidden;
}

.task span{
	margin-left:10px;
}

i{
	margin:10px;
	width:20px;
	cursor: pointer;
}

.comp .task{
	background: rgba(251, 197, 49,.5);
}
</style>
