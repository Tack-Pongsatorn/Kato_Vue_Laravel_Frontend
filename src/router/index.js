import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from '../views/frontend/Homepage';
import Register from '../views/frontend/Register';
import MenuList from '../views/frontend/MenuList';
import Receipt from '../views/frontend/Receipt';
import Rule from '../views/frontend/Rule';
import Reward from '../views/frontend/Reward';
import History from '../views/frontend/History';
import Login from '../views/backend/Login';
import Dashboard from '../views/backend/Dashboard'

Vue.use(VueRouter);

const routes = [
  {
    path: '/admin/dashboard',
    component: Dashboard,
    children: [
      // Dashboard
      {
        path: '',
        component: () => import('../components/Dashboard'),
      },
      {
        path: 'users',
        component: () => import('../components/Users'),
      },
      {
        path: 'transactions',
        component: () => import('../components/Transactions'),
      },
      {
        path: 'memberdata',
        component: () => import('../components/MemberData'),
      },
    ]
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/reward',
    name: 'Reward',
    component: Reward
  },
  {
    path: "/",
    name: "Home",
    component: Homepage,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/menu",
    name: "MenuList",
    component: MenuList,
  },
  {
    path: "/receipt",
    name: "Receipt",
    component: Receipt,
  },
  {
    path: "/rule",
    name: "Rule",
    component: Rule,
  },

];

const router = new VueRouter({
  routes,
});

export default router;
