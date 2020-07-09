import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import axios from 'axios'

Vue.prototype.$http = axios;
axios.defaults.baseURL = process.env.VUE_APP_REMOTE || 'https://qnote.qfstudio.net/api/'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')