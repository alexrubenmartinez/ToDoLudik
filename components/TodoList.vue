<template>
  <div class="todo-list">
    <h2>Lista de Tareas</h2>
    <div v-if="tareas.length === 0">No hay tareas disponibles.</div>
    <div class="flex flex-col space-y-3 gap-3 bg-blue-200" v-for="tarea in tareas" :key="tarea._id">
      <TodoItem :tarea="tarea" />
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
