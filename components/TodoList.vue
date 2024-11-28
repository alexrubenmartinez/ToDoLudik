<template>
  <div class="todo-list space-y-2 w-full rounded-xl shadow h-full lg:min-h-96 p-4">
    <h2 class="text-center text-2xl font-bold py-2">Lista de Tareas</h2>

    <div class="mb-4 flex justify-between gap-2">
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-blue-500 text-white rounded" :class="{ 'bg-blue-700': filtroEstado === 'pendiente' }" @click="filtroEstado = 'Pendiente'">Pendiente</button>
        <button class="px-4 py-2 bg-yellow-500 text-white rounded" :class="{ 'bg-yellow-700': filtroEstado === 'en-proceso' }" @click="filtroEstado = 'En proceso'">
          En Proceso
        </button>
        <button class="px-4 py-2 bg-green-500 text-white rounded" :class="{ 'bg-green-700': filtroEstado === 'completada' }" @click="filtroEstado = 'Completada'">
          Completada
        </button>
      </div>

      <input type="date" v-model="filtroFecha" class="border p-2 rounded" />
    </div>

    <div v-if="tareasFiltradas.length === 0">No hay tareas disponibles.</div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <TodoItem v-for="tarea in tareasFiltradas" :key="tarea._id" :tarea="tarea" />
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'
import TodoItem from './TodoItem.vue'
import { onMounted, computed, ref } from 'vue'

const todoStore = useTodoStore()

const tareas = computed(() => todoStore.tareas)

const filtroEstado = ref('')
const filtroFecha = ref('')

const formatDate = (date) => {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const tareasFiltradas = computed(() => {
  let tareasFiltradas = tareas.value

  if (filtroEstado.value) {
    tareasFiltradas = tareasFiltradas.filter((tarea) => tarea.estado === filtroEstado.value)
  }

  if (filtroFecha.value) {
    const fechaFiltro = new Date(filtroFecha.value).toISOString().split('T')[0]

    tareasFiltradas = tareasFiltradas.filter((tarea) => {
      const fechaCreacion = new Date(tarea.fechaCreacion).toISOString().split('T')[0]
      return fechaCreacion === fechaFiltro
    })
  }

  return tareasFiltradas
})

onMounted(async () => {
  await todoStore.fetchTareas()
})
</script>
