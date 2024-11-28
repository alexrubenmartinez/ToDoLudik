// utils/auth.ts
import '@/stores/authStore'

export function isAuthenticated(): boolean {
  const authStore = useAuthStore()

  if (!authStore.token) {
    authStore.loadTokenFromLocalStorage()
  }

  return !!authStore.token
}
