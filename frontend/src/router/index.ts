import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home.vue'
import DashboardView from '../pages/auth/Dashboard.vue'
import LoginView from '../pages/auth/Login.vue'
import RegisterView from '../pages/auth/Register.vue'
import { useUserStore } from '../store/user'

function isAuthenticated(): boolean {
    // Replace this with your actual authentication logic
    return !!localStorage.getItem('authToken');
}

const router = createRouter({
//   history: createWebHistory(),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { requiresAuth: true } 
        // beforeEnter: (to :any, from :any, next :any) => {
        //     if (!isAuthenticated()) {
        //       next('/login'); // Redirect to login if not authenticated
        //     } else {
        //       next(); // Allow access if authenticated
        //     }
        //   },
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView,
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView,
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/', // Redirect unknown routes to Home
      },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

// router.beforeEach((to :any, from :any, next :any) => {
//     const isAuthenticated = !!localStorage.getItem('authToken'); // Replace with your auth logic
//     if (to.meta.requiresAuth && !isAuthenticated) {
//       next({ name: 'Login' });
//     } else {
//       next();
//     }
//   });

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token'); // Retrieve the token
  const userStore = useUserStore();
  const userToken = userStore.token;

  if (to.meta.requiresAuth && (!token || userToken != token)) {
      // If route requires auth and no token, redirect to login
      next({ name: 'Login' });
  } else {
      next(); // Proceed as normal
  }
});

export default router
