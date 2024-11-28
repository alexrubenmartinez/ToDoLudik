<!-- components/TodoItem.vue -->
<template>
  <div class="flex gap-3 border-2 border-black rounded-md p-4">
    <h3>{{ tarea.titulo }}</h3>
    <p>{{ tarea.descripcion }}</p>
    <p><strong>Estado:</strong> {{ tarea.estado }}</p>
    <button @click="confirmDelete(tarea._id)" aria-label="Eliminar tarea">Eliminar</button>
    <button @click="editTarea(tarea._id)" aria-label="Editar tarea">Editar</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useTodoStore } from '../stores/todoStore'
const todoStore = useTodoStore()

const props = defineProps({
  tarea: Object,
})

const deleteTarea = async (id) => {
  try {
    console.log(id)
    await todoStore.deleteTarea(id)
    alert('Tarea eliminada correctamente')
    // Aquí puedes hacer algo más como recargar tareas o redirigir a otro lugar
  } catch (error) {
    console.error('Error al eliminar la tarea:', error)
    alert('Hubo un error al eliminar la tarea')
  }
}

const confirmDelete = (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    deleteTarea(id)
  }
}

const editTarea = (id) => {
  console.log('Editar tarea', id)
}
</script>
