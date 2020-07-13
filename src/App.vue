<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
	name: 'app',
	components: {
	},
	mounted: function () {
			//此方法刷新页面时也会执行
			window.addEventListener('beforeunload',()=>{
			// sessionStorage.removeItem('token');
			//解决H5键盘弹起webview缩小的问题,高度维持不变,被键盘遮住的内容隐藏起来.
			const firstHeight = document.querySelector('.body').style.height;
			window.onresize = ()=>{
				let body = document.querySelector('.body');
				if(body.style.height < firstHeight)
				{
					body.style.height = firstHeight;
				}
			}
		});
	 },
	created(){
		let loading = document.querySelector('.loading');
		if(loading !== null){
			document.body.removeChild(loading);
		}
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
