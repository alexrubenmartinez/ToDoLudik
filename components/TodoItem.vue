<template>
  <div class="flex gap-3 border-2 border-black rounded-md p-4">
    <h3>{{ tarea.titulo }}</h3>
    <p>{{ tarea.descripcion }}</p>
    <p><strong>Estado:</strong> {{ tarea.estado }}</p>
    <button @click="confirmDelete(tarea._id)" aria-label="Eliminar tarea">Eliminar</button>
    <button @click="openEditModal" aria-label="Editar tarea" class="text-blue-600 underline">Editar</button>

    <!-- Modal -->
    <EditTaskModal v-if="isEditModalVisible" :task="editableTask" :isVisible="isEditModalVisible" @close="closeEditModal" />
  </div>
</template>

<script setup>
import { defineProps, ref, reactive } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import EditTaskModal from './EditTaskModal.vue'

const todoStore = useTodoStore()

const props = defineProps({
  tarea: Object,
})

// Estado del modal y la tarea editable
const isEditModalVisible = ref(false)
const editableTask = reactive({ ...props.tarea })

// Lógica para eliminar tarea
const deleteTarea = async (id) => {
  try {
    await todoStore.deleteTarea(id)
    alert('Tarea eliminada correctamente')
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

// Abrir y cerrar el modal
const openEditModal = () => {
  Object.assign(editableTask, props.tarea) // Asegura que la tarea sea actual
  isEditModalVisible.value = true
}

const closeEditModal = () => {
  isEditModalVisible.value = false
}
</script>
