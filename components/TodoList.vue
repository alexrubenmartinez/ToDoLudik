<template>
  <div class="todo-list w-full rounded-xl shadow h-full lg:min-h-96 p-4">
    <h2 class="text-center text-2xl font-bold py-2">Lista de Tareas</h2>
    <div v-if="tareas.length === 0">No hay tareas disponibles.</div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <TodoItem v-for="tarea in tareas" :key="tarea._id" :tarea="tarea" />
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'
import TodoItem from './TodoItem.vue'
import { onMounted, computed } from 'vue'

const todoStore = useTodoStore()

// Computed para reaccionar a cambios en el store
const tareas = computed(() => todoStore.tareas)

// Cargar tareas al montar el componente
onMounted(async () => {
  await todoStore.fetchTareas()
})
</script>
