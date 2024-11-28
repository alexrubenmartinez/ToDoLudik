<template>
  <div class="todo-list">
    <h2>Lista de Tareas</h2>
    <!-- Verifica si tareas contiene elementos -->
    <div v-if="tareas.length === 0">No hay tareas disponibles.</div>
    <div class="flex flex-col space-y-3 gap-3 bg-blue-200" v-for="tarea in tareas" :key="tarea._id">
      <TodoItem :tarea="tarea" />
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'
import TodoItem from './TodoItem.vue'
import { useAsyncData } from 'nuxt/app'

const todoStore = useTodoStore()

const { data: tareas } = await useAsyncData('tareas', async () => {
  await todoStore.fetchTareas()
  return todoStore.tareas
})
</script>
