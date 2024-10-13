import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ProfileView from '../views/ProfileView.vue'
import SecurityView from '../views/SecurityView.vue'
import ThemeView from '../views/ThemeView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import HelpView from '../views/HelpView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'  // 新增

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/settings/profile', name: 'Profile', component: ProfileView },
  { path: '/settings/security', name: 'Security', component: SecurityView },
  { path: '/settings/theme', name: 'Theme', component: ThemeView },
  { path: '/settings/notifications', name: 'Notifications', component: NotificationsView },
  { path: '/help', name: 'Help', component: HelpView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }  // 新增，放在最后
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，检查用户是否登录
router.beforeEach((to, _from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (to.name !== 'Login' && to.name !== 'NotFound' && !isLoggedIn) next({ name: 'Login' })
  else next()
})

export default router