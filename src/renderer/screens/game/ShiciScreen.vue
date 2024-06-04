<template>
  <v-container class="fill-height shici-background">
    <v-row class="text-center">
      <v-col cols="12" class="text-h3 slide-element slide-element.hide">
        {{ shiciItems[next].title }}
      </v-col>
      <v-col cols="12" class="text-h4">
        {{ shiciItems[next].name }}
      </v-col>
      <v-col cols="12" class="text-h4" style="white-space: pre-line; line-height: 4rem">
        {{ addBreaksToPoem(shiciItems[next].content) }}
      </v-col>
    </v-row>
    <v-row class="d-none">
      <v-btn color="primary">切换</v-btn>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const next = ref(0)
let timer: any = null

onMounted((): void => {
  timer = setInterval(() => {
    next.value++
    if (next.value === shiciItems.length) {
      next.value = 0
    }
  }, 2000)
})

const shiciItems = [
  {
    title: '《早春呈水部张十八员外》',
    name: '韩愈',
    content: '天街小雨润如酥，草色遥看近却无。最是一年春好处，绝胜烟柳满皇都。'
  },
  {
    title: '《踏莎行·小径红稀》',
    name: '晏殊',
    content:
      '重寻携手处，物是人非春暮。回首青门路。乱红飞絮相逐。行色匆匆，带酒有人携去。陌上相逢否。日暮碧云合，佳人在何处。'
  },
  {
    title: '《御街行·前时小饮春庭院》',
    name: '柳永',
    content:
      '别路长亭，离情别恨。愁来无计相回避。辇路生秋草，上林花发时。凭高何限意，无复侍臣知。十载故乡，十年佳妾。梦魂长在分襟地。参差烟树灞陵桥，风物尽前朝。哀蝉曲断，斜阳影里，秋光老尽，故人千里。'
  }
]

const addBreaksToPoem = (poem: string): string => {
  // 使用正则表达式来匹配句尾（, . 或 ?）并添加<br>
  // 注意：g 标志表示全局搜索，即替换所有匹配的子串
  return poem.replace(/([。．?！？！])/g, function (match) {
    // 替换匹配到的字符为原字符 + <br>
    // 注意：在HTML中直接显示中文句号“。”和全角问号“？”可能需要特别处理
    // 这里假设这些字符在原始字符串中已经被正确地使用
    return match + '\n'
  })
}

onBeforeUnmount(() => {
  clearInterval(timer)
  timer = null
})
</script>

<style scoped>
.shici-background {
  background-image: url('images/background-shici.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
