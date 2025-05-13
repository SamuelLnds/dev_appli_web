<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'LoginView',
  data() {
    return {
      name: '',
      password: '',
      loading: false,
      errorMessage: '',
    }
  },
  computed: {
    nameError() {
      return !this.name.trim()
    },
    passwordError() {
      return !this.password.trim()
    },
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = ''
      if (this.nameError || this.passwordError) return

      this.loading = true
      const auth = useAuthStore()

      try {
        await auth.login(this.name, this.password)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.errorMessage = err.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div class="w-full max-w-md bg-container shadow-md rounded-lg p-6 space-y-4">
      <h1 class="text-2xl font-semibold text-center text-text-heading">Connexion</h1>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div>
          <label for="name" class="block text-sm text-text-muted">Nom d'utilisateur</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="mt-1 w-full px-3 py-2 border rounded-md text-sm bg-surface text-text border-border"
            :class="{ 'border-error': nameError }"
          />
          <p v-if="nameError" class="text-error text-xs mt-1">Champ requis</p>
        </div>

        <div>
          <label for="password" class="block text-sm text-text-muted">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 w-full px-3 py-2 border rounded-md text-sm bg-surface text-text border-border"
            :class="{ 'border-error': passwordError }"
          />
          <p v-if="passwordError" class="text-error text-xs mt-1">Champ requis</p>
        </div>

        <button
          type="submit"
          class="w-full py-2 rounded-md text-white bg-primary hover:bg-primary-hover disabled:opacity-50 transition"
          :disabled="loading"
        >
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>

        <p v-if="errorMessage" class="text-error text-sm text-center">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
