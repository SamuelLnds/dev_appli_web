<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="min-h-screen bg-[var(--color-background)] text-[color:var(--color-text)] transition-colors"
  >
    <!-- Header -->
    <header
      class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]"
    >
      <h1 class="text-xl font-bold text-[color:var(--color-text-heading)]">Relay Manager</h1>
      <nav class="flex gap-4 text-sm">
        <RouterLink to="/" class="hover:underline text-[color:var(--color-text-muted)]"
          >Accueil</RouterLink
        >
        <RouterLink to="/lists" class="hover:underline text-[color:var(--color-text-muted)]"
          >Listes</RouterLink
        >
        <RouterLink to="/profile" class="hover:underline text-[color:var(--color-text-muted)]"
          >Profil</RouterLink
        >
      </nav>
    </header>

    <!-- Main content -->
    <main class="p-6 max-w-4xl mx-auto">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
