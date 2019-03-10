// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from 'axios';
import store from './store/index.js';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import router from './router/router.js';


Vue.use(MintUi);
// Vue.config.productionTip = false

// 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
Vue.prototype.$Http = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
