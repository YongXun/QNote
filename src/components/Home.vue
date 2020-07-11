<template>
	<div class="homeWrapper">
		<!-- newNote 输入面板 -->
		<div class="notePad">
			<div class="notePadWrap">	
				<i class="iconfont icon-cancel btnBack" @click="hideNotePad"></i>
			</div>
		</div>
		<div class="userPad">
			<div class="userPadWrap">
				<i class="iconfont icon-cancel btnBack" @click="hideUser"></i>
			</div>
		</div>
		<div class="homeContainer">
			<div class="messageArea">
				<div class="userMessage">
					<h2>用户信息</h2>
				</div>
				<div class="art">
					<h2>动画展示</h2>
				</div>
			</div>
			<div class="workArea">
				<div class="btnBox">
					<i class="iconfont icon-jia btnAdd" @click="showNotePad"></i>
					<i class="iconfont icon-dingbudaohang-zhangh btnShow" @click="showUser"></i>
				</div>
				<div class="workAreaView">
					<!-- 总览面板 -->
					<div class="front">
						<h2>总览面板</h2>
						<button class="rotate" style="width:100px;height:50px;" @click="turnToBack">button</button>
					</div>
					<!-- 详细面板 -->
					<div class="back">
						<i class="iconfont icon-cancel btnBack" @click="backToFront"></i>
						<h2>详情面板</h2>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
/* 背景 */
.homeWrapper{
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
/* userPad */
.userPad{
	position: absolute;
	top: 0;
	right:-100%;
	width:100%;
	z-index: 1;
	height: 100%;
	transition: .5s linear;
}
.userPadWrap{
	position: relative;
	width: 100%;
	height: 100%;
	background:lightblue;
}
/* notePad */
.notePad{
	position: absolute;
	top: 0;
	left:-100%;
	width:100%;
	z-index: 1;
	height: 100%;
	transition: .5s linear;
}
.notePadWrap{
	position: relative;
	width: 100%;
	height: 100%;
	background: rgba(232, 65, 24,1.0);
}
/* main */
.homeContainer{
	display: flex;
	flex-direction: row;
	height: 100%;
	background: rgba(47, 54, 64,.5);
}

/* messageArea */
.messageArea{
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 30%;
	height: 100%;
}

.userMessage{
	width:100%;
	height: 40%;
	border: solid 1px #fff;
}

.art{
	width: 100%;
	height: 60%;
	border: solid 1px #fff;
}

/* wordArea */
.workArea{
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	border: solid 1px #fff;
	overflow: hidden;
}

.btnBox{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 10%;
}

.btnShow,.btnAdd{
	display: block;
	width: 20%;
	height: 100%;
	font-size: 3.5em;
	cursor: pointer;
}

.workAreaView{
	position: relative;
	display: flex;
	flex-direction: row;
	overflow: hidden;
	width: 200%;
	height: 90%;
	border: solid 1px #fff;
	transition: .5s linear;
}

.front,.back{
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.5s linear;
}

.front{
	background: rgba(47, 54, 64,.5);
}

.back{
	background: rgba(251, 197, 49,1.0);
}

.btnBack{
	position: absolute;
	top: 0;
	right: 10px;
	font-size: 2.5em;
	cursor: pointer;
}


</style>

<script>
import axios from 'axios'
	export default{
		mounted:function(){
			//this.getMessage();
		},
		props:['username'],
		data(){
			return{
				user:{
					userMessage:{
						username:'',
						email:'',
					},
					noteMessage:{
						noteNum:0,
						currentNoteNum:0,
						completeNoteNum:0,
						giveUpNoteNum:0,
						notcompNoteList:[],
						compNoteList:[],
					},
				note:{
					noteID:'',
					noteContent:'',
					noteRemark:'',
					done:false
				}
				}
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
					console.log(result);
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
		},
		turnToBack:function(){
			let view = document.querySelector('.workAreaView');
			view.style.marginLeft = '-100%';
		},
		backToFront:function(){
			let view = document.querySelector('.workAreaView');
			view.style.marginLeft = '0';
		},
		showUser:function(){
			let userPad = document.querySelector('.userPad');
			userPad.style.right = '0';
		},
		hideUser:function(){
			let userPad = document.querySelector('.userPad');
			userPad.style.right = '-100%';
		},
		showNotePad:function(){
			let notePad = document.querySelector('.notePad');
			notePad.style.left = '0';
		},
		hideNotePad:function(){
			let notePad = document.querySelector('.notePad');
			notePad.style.left = '-100%';
		},
	}
}
</script>


