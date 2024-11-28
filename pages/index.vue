<script setup lang="js">
import { useTodoStore } from '@/stores/todoStore'
import { useAuthStore } from '@/stores/authStore'
import AddTodoForm from '@/components/AddTodoForm.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
definePageMeta({
  middleware: 'auth',
})

const todoStore = useTodoStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {

  todoStore.fetchTareas()
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="container mx-auto p-4 w-full">
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Mis Tareas</h1>
      <button @click="logout" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Cerrar Sesión</button>
    </header>

    <AddTodoForm />
    <div class="w-full flex flex-col md:flex-row gap-4">
      <div class="w-full"><!-- <Login /> -->place</div>
      <div class="w-full"><TodoList /></div>
    </div>
  </div>
</template>

<style scoped></style>
