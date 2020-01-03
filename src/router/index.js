import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Index.vue'
import Login from '../components/Login.vue'
import CreateBill from '../components/CreateBill.vue'
import MyBills from '../components/BillList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, 
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/create_bill',
    name: 'createBill',
    component: CreateBill,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my_billList',
    name: 'billList',
    component: MyBills,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
