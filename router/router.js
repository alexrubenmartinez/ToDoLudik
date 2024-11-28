const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: Login,
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore()
        const isValid = await authStore.validateToken()

        if (isValid) {
          next('/')
        } else {
          next()
        }
      },
    },
  ],
})
