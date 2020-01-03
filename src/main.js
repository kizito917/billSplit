import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(axios)

Vue.config.productionTip = false

setTimeout(() => {
  localStorage.removeItem('bearerToken')
}, 8000);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('bearer_token')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
