<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
      <h2 class="text-lg font-semibold mb-4">Editar Tarea</h2>
      <form @submit.prevent="updateTask">
        <div class="mb-4">
          <label for="titulo" class="block text-sm font-medium">Título</label>
          <input id="titulo" type="text" v-model="editableTask.titulo" class="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label for="descripcion" class="block text-sm font-medium">Descripción</label>
          <textarea id="descripcion" v-model="editableTask.descripcion" class="mt-1 block w-full border rounded px-3 py-2"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">Estado</label>
          <div class="flex space-x-4">
            <label class="flex items-center">
              <input type="radio" v-model="editableTask.estado" value="Pendiente" class="mr-2" />
              Pendiente
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="editableTask.estado" value="En proceso" class="mr-2" />
              En proceso
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="editableTask.estado" value="Completada" class="mr-2" />
              Completada
            </label>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button type="button" class="px-4 py-2 bg-gray-300 rounded" @click="closeModal">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const todoStore = useTodoStore()

// Create a reactive copy of the task for editing
const editableTask = reactive({ ...props.task })

// Function to close the modal
function closeModal() {
  emit('close')
}

// Function to update the task
async function updateTask() {
  try {
    await todoStore.updateTarea(editableTask._id, editableTask.titulo, editableTask.estado, editableTask.descripcion)
    alert('Tarea actualizada correctamente')
    closeModal()
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    alert('Hubo un error al actualizar la tarea')
  }
}
</script>
