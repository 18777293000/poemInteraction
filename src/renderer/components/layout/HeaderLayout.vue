<script setup lang="tsx">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route: any = useRoute()
const titleKey: string = (route?.meta?.titleKey || 'title.main') as string

const handleRoute = (path: string): void => {
  router.push(path)
}

const isCurrentRoute = (path: string): boolean => {
  return path === route.path
}
</script>
<template>
  <v-app-bar color="#ffa631" density="compact" class="header-background">
    <!-- <v-app-bar-title>{{ $t(titleKey) }}</v-app-bar-title> -->
    <template #append>
      <v-btn
        prepend-icon="mdi-home"
        variant="text"
        :class="{ active: isCurrentRoute('/') }"
        @click="handleRoute('/')"
      >
        {{ $t('title.main') }}
      </v-btn>
      <v-btn
        prepend-icon="mdi-fit-to-screen-outline"
        variant="text"
        :class="{ active: isCurrentRoute('/second') }"
        @click="handleRoute('/second')"
      >
        {{ $t('title.second') }}
      </v-btn>
    </template>
  </v-app-bar>
</template>
<style scoped>
.v-btn {
  opacity: 0.4;
}
.active {
  opacity: 1 !important;
}
.header-background {
  background-image: url('/images/background-title.png') !important;
  background-position: 100% auto;
}
</style>
