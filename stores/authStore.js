// stores/authStore.js
import { defineStore } from 'pinia'

let LOGIN_URL = process.env.LOGIN_URL
let REGISTER_URL = process.env.REGISTER_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    async loadTokenFromLocalStorage() {
      if (typeof window !== 'undefined') {
        const token = await new Promise((resolve) => {
          const tokenFromStorage = localStorage.getItem('token')
          resolve(tokenFromStorage)
        })
        if (token) {
          this.token = token
        }
      }
    },

    async register(nombre, email, password) {
      try {
        const response = await fetch('https://todoludikback.onrender.com/usuario/crearUsuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, email, password }),
        })

        if (!response.ok) {
          throw new Error('Error al registrar el usuario')
        }

        const data = await response.json()
        localStorage.setItem('token', data.token)
        this.token = data.token
        this.user = data.data
      } catch (error) {
        console.error(error)
        throw new Error('Error al registrar el usuario')
      }
    },

    async login(email, password, router) {
      try {
        const response = await fetch('https://todoludikback.onrender.com/usuario/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error('Credenciales incorrectas')
        }

        const data = await response.json()
        localStorage.setItem('token', data.token)
        this.token = data.token
        this.user = data.data

        router.push('/')
      } catch (error) {
        console.error(error)
        throw new Error('Credenciales incorrectas')
      }
    },

    logout() {
      this.token = null
      this.user = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
    },
  },
})
