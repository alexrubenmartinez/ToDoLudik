<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import AddTodoForm from '@/components/AddTodoForm.vue'
import { onMounted } from 'vue'

const todoStore = useTodoStore()

onMounted(() => {
  // Obtener tareas cuando se monta la página
  todoStore.fetchTareas()
})
</script>

<template>
  <div class="container mx-auto p-4 w-full">
    <h1 class="text-3xl font-bold mb-4">Mis Tareas</h1>
    <AddTodoForm />
    <div class="w-full flex flex-col md:flex-row gap-4">
      <div class="w-full">a</div>
      <div class="w-full"><TodoList /></div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos globales de la página */
</style>
