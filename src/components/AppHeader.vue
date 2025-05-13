<!-- src/components/AppHeader.vue -->
<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'AppHeader',
  computed: {
    auth() {
      return useAuthStore()
    },
  },
  methods: {
    async handleLogout() {
      await this.auth.logout()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<template>
  <header class="flex px-6 py-4 border-b border-[var(--color-border)]">
    <div class="flex items-center justify-between max-w-4xl mx-auto w-full">
      <h1 class="text-xl font-bold text-[color:var(--color-text-heading)]">Relay Manager</h1>
      <nav class="flex gap-4 text-sm items-center">
        <RouterLink
          v-if="auth.isAuthenticated"
          to="/"
          class="hover:underline text-[color:var(--color-text-muted)]"
        >
          Accueil
        </RouterLink>
        <RouterLink
          v-if="auth.isAuthenticated"
          to="/lists"
          class="hover:underline text-[color:var(--color-text-muted)]"
        >
          Listes
        </RouterLink>
        <RouterLink
          v-if="auth.isAuthenticated"
          to="/profile"
          class="hover:underline text-[color:var(--color-text-muted)]"
        >
          Profil
        </RouterLink>

        <button
          v-if="auth.isAuthenticated"
          @click="handleLogout"
          class="ml-4 text-[color:var(--color-error)] text-sm underline"
        >
          Déconnexion
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header div {
  margin-inline: auto;
}
</style>
