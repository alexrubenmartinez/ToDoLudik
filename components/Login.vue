<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-lg font-semibold mb-4">Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Correo electrónico</label>
          <input type="email" id="email" v-model="email" class="mt-1 block w-full border rounded px-3 py-2" placeholder="Introduce tu correo" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Contraseña</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full border rounded px-3 py-2" placeholder="Introduce tu contraseña" required />
        </div>
        <div class="flex justify-between">
          <NuxtLink to="/register" class="px-4 py-2 bg-blue-600 text-white rounded"> Registrarse </NuxtLink>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Iniciar sesión</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  try {
    await authStore.login(email.value, password.value, router)
    router.push('/')
  } catch (error) {
    alert('Error al iniciar sesión: ' + error.message)
  }
}
</script>
