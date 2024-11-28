<template>
  <div class="flex gap-3 rounded-md p-4 w-full bg-orange-200">
    <div class="flex flex-col w-full h-24">
      <h3 class="font-bold text-lg">{{ tarea.titulo }}</h3>
      <p class="text-sm">{{ tarea.descripcion }}</p>

      <p class="text-sm mt-auto"><strong>Estado:</strong> {{ tarea.estado }}</p>
    </div>
    <div class="flex flex-col items-center justify-center gap-2">
      <button @click="openEditModal" aria-label="Editar tarea" class="text-blue-600 underline">
        <svg class="size-5" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.63565 0.732849L7.88077 1.88934L6.93158 2.77135L5.68646 1.61486L6.63565 0.732849ZM2.0752 6.12517H3.32032L6.34471 3.31606L5.09959 2.15957L2.0752 4.96868V6.12517Z"
            fill="#4B332F"
          />
          <path
            d="M6.64063 7.28165H2.14077C2.12998 7.28165 2.11878 7.2855 2.10798 7.2855C2.09429 7.2855 2.08059 7.28203 2.06648 7.28165H0.830076V1.8847H3.67185L4.50193 1.11371H0.830076C0.372287 1.11371 -3.8147e-06 1.45911 -3.8147e-06 1.8847V7.28165C-3.8147e-06 7.70724 0.372287 8.05264 0.830076 8.05264H6.64063C6.86079 8.05264 7.07192 7.97141 7.22759 7.82682C7.38326 7.68223 7.47071 7.48613 7.47071 7.28165V3.94017L6.64063 4.71116V7.28165Z"
            fill="#4B332F"
          />
        </svg>
      </button>
      <button @click="confirmDelete(tarea._id)" aria-label="Eliminar tarea">
        <svg class="size-5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.66016 7.62216C1.43189 7.62216 1.2364 7.5466 1.07371 7.39549C0.911012 7.24437 0.829802 7.06293 0.830079 6.85117V1.83972H0.415039V1.06872H2.49024V0.683228H4.98048V1.06872H7.05568V1.83972H6.64064V6.85117C6.64064 7.06319 6.55929 7.24476 6.39659 7.39587C6.2339 7.54699 6.03855 7.62242 5.81056 7.62216H1.66016ZM5.81056 1.83972H1.66016V6.85117H5.81056V1.83972ZM2.49024 6.08017H3.32032V2.61071H2.49024V6.08017ZM4.1504 6.08017H4.98048V2.61071H4.1504V6.08017Z"
            fill="#4B332F"
          />
        </svg>
      </button>
    </div>

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
