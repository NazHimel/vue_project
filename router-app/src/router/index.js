import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import UserPage from '@/components/UserPage.vue';
import Admin from '@/components/AdminPage.vue';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/add-user',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      }
    },{
      path: '/user-page',
      name: 'UserPage',
      component: UserPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin : true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to,from);
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'));
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.is_admin){
          next();
        }
        else{
          next({ name: 'UserPage'})
        }
      }else {
        next();
      }
    }
  }else {
    next()
  }
});
export default router;
