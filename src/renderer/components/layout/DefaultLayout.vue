<script setup lang="tsx">
import HeaderLayout from '@/renderer/components/layout/HeaderLayout.vue'
</script>

<template>
  <v-app>
    <v-layout>
      <HeaderLayout />
      <v-main style="background-color: #eacd76">
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
