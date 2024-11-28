<!-- components/AddTodoForm.vue -->
<template>
  <form class="flex flex-col gap-y-1 md:flex-row gap-3 rounded-md p-4 bg-white" @submit.prevent="addTarea">
    <input class="border-2 rounded-md px-2 bg-blue-50" v-model="titulo" type="text" placeholder="Tarea" required />
    <textarea class="border-2 rounded-md px-2 w-full bg-blue-50" v-model="descripcion" placeholder="Descripción de la tarea"></textarea>
    <button class="bg-green-600 text-white px-2 rounded-md text-nowrap text-sm" type="submit">Añadir Tarea</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const titulo = ref('')
const descripcion = ref('')
const todoStore = useTodoStore()

const addTarea = async () => {
  if (titulo.value.trim()) {
    await todoStore.addTarea(titulo.value, descripcion.value)
    titulo.value = ''
    descripcion.value = ''
    await todoStore.fetchTareas()
  }
}
</script>
