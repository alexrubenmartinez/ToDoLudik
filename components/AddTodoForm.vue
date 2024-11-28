<!-- components/AddTodoForm.vue -->
<template>
  <form class="flex gap-3 border-2 border-black rounded-md p-4" @submit.prevent="addTarea">
    <input class="border-2 border-black rounded-md p-2" v-model="titulo" type="text" placeholder="Título" required />
    <textarea class="border-2 border-black rounded-md p-2" v-model="descripcion" placeholder="Descripción"></textarea>
    <button class="bg-blue-500 text-white p-2 rounded-md" type="submit">Añadir Tarea</button>
    <!--  <textarea v-model="descripcion" placeholder="Descripción"></textarea>
    <button type="submit">Añadir Tarea</button> -->
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
    await todoStore.addTarea(titulo.value, descripcion.value) // Await the addTarea function to ensure task is added first
    titulo.value = ''
    descripcion.value = ''
    await todoStore.fetchTareas() // Refresh the task list after adding the new task
  }
}
</script>
