<template>
	<div class="homeWrapper">
		<!-- newNote 输入面板 -->
		<div class="notePad"></div>
		<div class="homeContainer">
			<div class="messageArea"></div>
			<div class="workArea"></div>
		</div>
	</div>
</template>

<style>
/* 背景 */
.homeWrapper{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: url(../../public/img/bg-home-desktop.jpg) center;
}

/* main */
.homeContainer{
	display: flex;
	flex-direction: row;
	width: 80%;
	height: 100%;
	background: rgba(47, 54, 64,.6);
}

/* messageArea */
.messageArea{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 30%;
	height: 100%;
}

/* wordArea */
.workArea{
	
}

</style>

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
		}
	}
}
</script>


