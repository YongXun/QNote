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
			sessionStorage.removeItem('token');
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
}
</style>
