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
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Mis Tareas</h1>
    <AddTodoForm />
    <TodoList />

    <!-- Formulario para agregar tarea -->

    <!--    <div v-if="todoStore.tareas.length > 0" class="mt-6">
      <h2 class="text-2xl font-semibold mb-4">Lista de Tareas</h2>
      <ul class="space-y-2">
        <li v-for="tarea in todoStore.tareas" :key="tarea._id" class="flex justify-between items-center p-4 border-b">
          <div :class="{ 'line-through text-gray-500': tarea.estado === 'Completada' }">
            {{ tarea.titulo }}
          </div>
          <div class="flex items-center">
            <span
              class="text-sm text-blue-500 cursor-pointer"
              @click="
                tarea.estado = 'Completada'
                todoStore.fetchTareas()
              "
            >
              {{ tarea.estado === 'Completada' ? 'Reabrir' : 'Marcar como completada' }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div v-else class="mt-6">
      <p>No tienes tareas pendientes.</p>
    </div> -->
  </div>
</template>

<style scoped>
/* Estilos globales de la página */
</style>
