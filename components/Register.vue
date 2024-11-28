<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-lg font-semibold mb-4">Registrarse</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="nombre" class="block text-sm font-medium">Nombre</label>
          <input type="text" id="nombre" v-model="nombre" class="mt-1 block w-full border rounded px-3 py-2" placeholder="Introduce tu nombre" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Correo electrónico</label>
          <input type="email" id="email" v-model="email" class="mt-1 block w-full border rounded px-3 py-2" placeholder="Introduce tu correo" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Contraseña</label>
          <input type="password" id="password" v-model="password" class="mt-1 block w-full border rounded px-3 py-2" placeholder="Introduce tu contraseña" required />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium">Confirmar contraseña</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="mt-1 block w-full border rounded px-3 py-2" placeholder="Confirma tu contraseña" required />
        </div>
        <div class="flex justify-between">
          <NuxtLink to="/login" class="px-4 py-2 bg-blue-600 text-white rounded"> Volver </NuxtLink>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Registrarse</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const nombre = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const authStore = useAuthStore()
const router = useRouter()

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    await authStore.register(nombre.value, email.value, password.value)
    router.push('/login')
  } catch (error) {
    alert('Error al registrarse: ' + error.message)
  }
}
</script>
