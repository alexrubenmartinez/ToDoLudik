export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  if (!authStore.token) {
    await authStore.loadTokenFromLocalStorage()
  }

  const isAuthenticated = !!authStore.token
  console.log(isAuthenticated)

  if (to.path !== '/login' && !isAuthenticated) {
    return navigateTo('/login')
  }

  if (to.path === '/login' && isAuthenticated) {
    return navigateTo('/')
  }
})
