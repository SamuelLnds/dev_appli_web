<script>
import { useAuthStore } from '@/stores/authStore'
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
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
  components: {
    AppHeader,
  },
}
</script>

<template>
  <div
    class="min-h-screen bg-[var(--color-background)] text-[color:var(--color-text)] transition-colors"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main class="p-6 max-w-4xl mx-auto">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
