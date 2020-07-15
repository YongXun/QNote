<template>
	<div class="homeWrapper">
		<!-- newNote 输入面板 -->
		<div class="notePad">
			<div class="notePadWrap">	
				<i class="iconfont icon-cancel btnBack" @click="hideNotePad"></i>
				<div class="inputNote">
						<input @keyup="checkInputContent" type="text" name="noteContent" class="inputNoteContent" placeholder="输入便签"> 
						<h3>备注</h3>
						<textarea @keyup="checkInputRemark" rows="10" cols="30" class="inputNoteRemark" placeholder="50字内有效"></textarea>
						<br>
						<span class="inputInfo">{{inputInfo}}</span>
						<div class="inputSubmit" @click="addNote">提交</div>
				</div>
			</div>
		</div>
		<!-- 用户面板 -->
		<div class="userPad">
			<div class="userPadWrap">
				<i class="iconfont icon-cancel btnBack" @click="hideUser"></i>
				<div class="userShow">
					<header>
						<span>用户名{{user.username}}</span>
					</header>
				</div>
			</div>
		</div>
		<div class="homeContainer">
			<div class="workArea">
				<div class="btnBox">
					<i class="iconfont icon-jia btnAdd" @click="showNotePad"></i>
					<i class="iconfont icon-dingbudaohang-zhangh btnShow" @click="showUser"></i>
				</div>
				<div class="workAreaView">
					<!-- 总览面板 -->
					<div class="front">
						<article class="todoList">
							<section v-for="note in noteList" v-bind:key="note.noteID" :style="note.done?'background:#fbc531;':''">
								<span class="noteContent">{{note.noteContent}}</span>
								<div class="funBtn">
									<i class="iconfont icon-chakan" @click="turnToBack(note)"></i>
									<i :class="{'iconfont':true,'icon-check':!note.done}" @click="completeNote(note.noteID)"></i>
									<i class="iconfont icon-trash" @click="deleteNote(note)"></i>
								</div>
							</section>
						</article>
					</div>
					<!-- 详细面板 -->
					<div class="back">
						<i class="iconfont icon-cancel btnBack" @click="backToFront"></i>
						<div class="showNoteBox">
							<p class="showNoteTitle">{{showNote.noteContent}}</p>
							<h2>备注</h2>
							<div class="showNoteRemark">{{showNote.noteRemark}}</div>
						</div>
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background:rgba(47, 54, 64,.8);
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
	display: flex;
	flex-direction: row;
	position: relative;
	width: 100%;
	height: 100%;
	background:rgba(47, 54, 64,.8);
}
.inputNote{
	height: 60%;
}
.inputNoteContent,.inputNoteRemark{
	background: inherit;
}
.inputNoteContent{
	font-size:1.5em ;
	border: 0;
	border-bottom:solid 3px #fff ;
}
.inputNoteRemark{
	width: 80%;
	font-size: 1.5em;
	border: solid 2px #fff;
	border-radius:10px ;
	padding: 10px;
	resize: none;
}
.inputInfo{
	width: 100%;
	color:#c23616;
}
.inputSubmit{
	width: 100px;
	height: 50px;
	line-height: 50px;
	font-size: 1.5em;
	background: inherit;
	border-radius: 25px;
	border: solid 2px #fff;
}
.inputSubmit:hover{
	background: rgba(127, 143, 166,1.0);
}
/* main */
.homeContainer{
	display: flex;
	flex-direction: row;
	height: 100%;
	background: rgba(47, 54, 64,.6);
}

/* wordArea */
.workArea{
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
}

.btnBox{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 10%;
	background: rgba(220, 221, 225,.5);
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

.todoList{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background: inherit;
	margin: auto;
	overflow: scroll;
}

.todoList section{
	display: flex;
	flex-direction:row;
	justify-content: space-between;
	width: 100%;
	height: 50px;
	line-height: 50px;
	margin:10px 0;
	padding:0 10px;
	background: rgba(220, 221, 225,.5);
}

.noteContent{
	font-size: 1.5em;
	overflow: hidden;
}

.todoList section .funBtn{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-left:10px;
	width: 20%;
	height:50px;
	font-size: 50px;
	line-height: 50px;
}

.todoList section .funBtn i{
	cursor: pointer;
}


.back{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: inherit;
}

.btnBack{
	position: absolute;
	top: 0;
	right: 10px;
	font-size: 2.5em;
	cursor: pointer;
}

.showNoteBox{
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 80%;
	height: 80%;
}

.showNoteTitle{
	width:80%;
	font-size: 2em;
	border-bottom: solid 3px #fff;
}

.showNoteRemark{
	width: 80%;
	height: 80%;
	font-size:1.5em ;
	margin-top: 10px;
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
				token:sessionStorage.getItem('token'),
				user:{
					username:'',
					email:'',
					noteNum:0,
					currentNoteNum:0,
					completeNoteNum:0,
					giveUpNoteNum:0,		
				},
				noteList:[],
				showNote:{
					noteID:0,
					noteContent:'',
					noteRemark:'',
					done:false
				},
				inputInfo:'',
			}
		},
		methods:{
			getMessage:async function(){
				//发送http请求,获取用户信息
				await this.$http.get(`user/getMessage`,{
					params:{token:this.token}
				}).then(res=>{
					//访问成功,接受数据
					if(res.status === 200){
						//复制对象
						Object.assign(this.user,res.data.user);
						res.data.note.forEach((value)=>{
							this.noteList.push(value)
						})
					}
				}).catch(err=>{
					console.log(err)
					this.$message.error(`访问服务器失败!`)
				})
			},
			addNote:async function(){
				//获取用户输入信息
				let noteContent = document.querySelector('.inputNoteContent').value;
				let noteRemark = document.querySelector('.inputNoteRemark').value.substring(0,50);
				noteRemark = noteRemark?noteRemark:`暂无备注`;
				await this.$http.post(`note/addTask`,{
					token:this.token,
					noteContent:noteContent,
					noteRemark:noteRemark
				}).then(res=>{
					let noteID = res.data.noteID
					//修改本地信息
					this.noteList.push({noteID,noteContent,noteRemark});
					this.user.noteNum++;
					this.user.currentNoteNum++;
					this.$message.success('添加成功!')
				}).catch(err=>{
					this.$message.error('请输入有效信息!');
				})
				//输入框重置
				document.querySelector('.inputNoteContent').value = '';
				document.querySelector('.inputNoteRemark').value = '';
				let notePad = document.querySelector('.notePad');
				notePad.style.left = '-100%';
				console.log(this.noteList);
			},
			completeNote:async function(noteID){
				console.log(this.noteList)
				//修改数据库
				await this.$http.post(`note/completeTask`,{
					token: this.token,
					username:this.user.username,
					noteID:noteID
				})
				.then(res=>{
					//修改本地数据
					this.noteList.forEach((value,index,arr)=>{
						if(value.noteID === noteID){
							arr[index].done = true;
							//刷新视图
							this.$forceUpdate(); 
						}
					})
					this.completeNoteNum++;
					this.currentNoteNum--;
				})
			},
			deleteNote:async function(note){
				//事务已经完成,删除事务
				if(note.done){
					//修改数据库
					await this.$http.post(`note/deleteNote`,{
						token: this.token,
						username:this.user.username,
						noteID:note.noteID
					})
					.then(res=>{
						//修改本地数据
						this.noteList.forEach((value,index,arr)=>{
							if(value.noteID === note.noteID){
								arr.splice(index,1);
							}
						})
					})					
				}
				//事务尚未完成,放弃事务
				else{
					await this.$http.post(`note/giveUpTask`,{
						token: this.token,
						username:this.user.username,
						noteID:note.noteID
					})
					.then(res=>{
						this.noteList.forEach((value,index,arr)=>{
							if(value.noteID === note.noteID){
								arr.splice(index,1);
							}
						})
					})
					this.giveUpNoteNum++;
					this.currentNoteNum--;
				}
			},
			move:function(){
				document.querySelector('.welcome-page').style.top = '-100%';
			},
			turnToBack:function(note){
				Object.assign(this.showNote,note);
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
			checkInputContent:function(){
				this.inputInfo = '';
				let input = document.querySelector('.inputNoteContent');
				if(input.value.length > 10){
					this.inputInfo = "标签标题长度不可以大于10"
				}
				input.value = input.value.slice(0,10);
			},
			checkInputRemark:function(){
				this.inputInfo = '';
				let input = document.querySelector('.inputNoteRemark');
				if(input.value.length > 50){
					this.inputInfo = "备注内容50字内有效"
				}
				input.value = input.value.slice(0,50);
			}
	}
}
</script>


