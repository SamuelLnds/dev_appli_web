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
    class="min-h-screen flex flex-col bg-[var(--color-background)] text-[color:var(--color-text)] transition-colors"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main
      :class="[
        'flex-1 p-6 max-w-4xl mx-auto w-full',
        $route.name === 'login' ? 'flex flex-col justify-center' : '',
      ]"
    >
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
