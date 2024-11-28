import { defineStore } from 'pinia'

interface Task {
  _id: string
  titulo: string
  descripcion: string
  estado: string
  fechaCreacion: string
  __v: number
}

interface ApiResponse {
  message: string
  data: Task[]
}

export const useTodoStore = defineStore('todo', () => {
  // Explicitly type the ref with Task array
  const tareas = ref<Task[]>([])

  const apiUrl = 'http://localhost:3001' // Cambia a tu URL de backend

  // Fetch all tasks
  async function fetchTareas() {
    try {
      // Especifica el tipo ApiResponse para la respuesta de $fetch
      const { data } = await $fetch<ApiResponse>(`${apiUrl}/tarea/obtenerTareas`)
      // Verifica que data y data.data existan y sean un array
      if (data && Array.isArray(data)) {
        tareas.value = data // Aquí tareas es de tipo Task[]
      } else {
        console.warn('La respuesta de la API no contiene un array de tareas.')
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  // Fetch task by ID
  async function fetchTarea(id: string): Promise<Task | null> {
    try {
      const { data, error } = await useFetch(`${apiUrl}/tarea/obtenerTarea/${id}`)

      if (error.value) {
        throw new Error(error.value.message)
      }

      return data.value as Task | null
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error)
      return null
    }
  }

  // Add a new task
  async function addTarea(titulo: string, descripcion?: string) {
    try {
      const { data, error } = await useFetch(`${apiUrl}/tarea/crearTarea`, {
        method: 'POST',
        body: { titulo, descripcion },
      })

      if (error.value) {
        throw new Error(error.value.message)
      }

      if (data.value) {
        tareas.value.push(data.value as Task)
      }
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // Update an existing task
  async function updateTarea(id: string, titulo: string, estado: string, descripcion?: string) {
    try {
      const { data, error } = await useFetch(`${apiUrl}/tarea/actualizarTarea/${id}`, {
        method: 'PUT',
        body: {
          titulo,
          descripcion,
          estado,
        },
      })

      if (error.value) {
        throw new Error(error.value.message)
      }

      // Type assertion and null check
      if (data.value) {
        const index = tareas.value.findIndex((tarea) => tarea._id === id)
        if (index !== -1) {
          tareas.value[index] = data.value as Task
        }
      }
    } catch (error) {
      console.error(`Error updating task ${id}:`, error)
    }
  }

  // Delete a task
  async function deleteTarea(id: string) {
    console.log(id)
    try {
      const { error } = await useFetch(`${apiUrl}/tarea/eliminarTarea/${id}`, {
        method: 'DELETE',
      })

      if (error.value) {
        throw new Error(error.value.message)
      }

      tareas.value = tareas.value.filter((tarea) => tarea._id !== id)
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error)
    }
  }

  return {
    tareas,
    fetchTareas,
    fetchTarea,
    addTarea,
    updateTarea,
    deleteTarea,
  }
})
