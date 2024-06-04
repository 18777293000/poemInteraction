<template>
  <v-app>
    <v-layout>
      <HeaderLayout />
      <v-main style="background-color: #eacd76">
        <slot />
        <DialogLayout />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="tsx">
import HeaderLayout from '@/renderer/components/layout/HeaderLayout.vue'
import DialogLayout from '@/renderer/screens/user/LoginScreen.vue'
</script>
