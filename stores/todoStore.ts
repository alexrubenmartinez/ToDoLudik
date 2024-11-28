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
  const tareas = ref<Task[]>([])
  const apiUrl = 'http://localhost:3001'

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getHeaders = () => {
    const token = getToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['authorization'] = `${token}`
    }
    return headers
  }

  // Obtener todas las tareas
  async function fetchTareas() {
    try {
      const response: ApiResponse = await $fetch(`${apiUrl}/tarea/obtenerTareas`, {
        headers: getHeaders(),
      })
      tareas.value = response.data
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  async function fetchTarea(id: string): Promise<Task | null> {
    try {
      const response: { data: Task } = await $fetch(`${apiUrl}/tarea/obtenerTarea/${id}`, {
        headers: getHeaders(),
      })
      return response.data || null
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error)
      return null
    }
  }

  async function addTarea(titulo: string, descripcion?: string) {
    try {
      const response: { data: Task } = await $fetch(`${apiUrl}/tarea/crearTarea`, {
        method: 'POST',
        body: { titulo, descripcion },
        headers: getHeaders(),
      })

      if (response.data) {
        tareas.value.push(response.data)
      }
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  async function updateTarea(id: string, titulo: string, estado: string, descripcion?: string) {
    try {
      const response: { data: Task } = await $fetch(`${apiUrl}/tarea/actualizarTarea/${id}`, {
        method: 'PUT',
        body: { titulo, descripcion, estado },
        headers: getHeaders(),
      })

      const updatedTask = response.data
      if (updatedTask) {
        const index = tareas.value.findIndex((tarea) => tarea._id === id)
        if (index !== -1) {
          tareas.value[index] = updatedTask
        }
      }
    } catch (error) {
      console.error(`Error updating task ${id}:`, error)
    }
  }

  async function deleteTarea(id: string) {
    try {
      await $fetch(`${apiUrl}/tarea/eliminarTarea/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })
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
