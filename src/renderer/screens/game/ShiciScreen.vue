<template>
  <v-container class="fill-height shici-background">
    <v-row class="text-center">
      <v-col cols="12" class="shici-title slide-element slide-element.hide">
        《{{ ShiciItem.title }}》
      </v-col>
      <v-col cols="12" class="shici-content">
        {{ ShiciItem.author }}
      </v-col>
      <v-col cols="12" class="shici-content" style="white-space: pre-line; line-height: 4rem">
        {{ addBreaksToPoem(ShiciItem.content) }}
      </v-col>
    </v-row>
    <!-- <div>{{ resultRes }}</div> -->
    <v-row class="d-none">
      <v-btn color="primary">切换</v-btn>
    </v-row>
    <music-component ref="shiCiMusicRef"></music-component>
  </v-container>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/renderer/store/counter'
import { storeToRefs } from 'pinia'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MusicComponent from '@/renderer/components/MusicComponent.vue'

const { counterIncrease, setPoetryLength } = useCounterStore()
const { counter } = storeToRefs(useCounterStore())
const ShiciItem = ref({
  author: '子兰',
  content: '独蝉初唱古槐枝，委曲悲凉断续迟。雨后忽闻谁最苦，异乡孤馆忆家时。',
  dynasty: '唐',
  id: 18,
  title: '蝉二首 其一'
})
const shiCiMusicRef = ref()
let timer: any = null

onMounted((): void => {
  shiCiMusicRef.value.selectSong('ChunJiangHuaYueYe')
  shiCiMusicRef.value.play()
  window.mainApi.invoke('queryTableLength', 'poetry').then((res) => {
    // console.log('queryTableLength', res);
    setPoetryLength(res.count)
    timer = setInterval(() => {
      getTableLength()
    }, 8000)
  })
})
const resultRes = ref()
const getTableLength = () => {
  window.mainApi.invoke('queryById', counter.value).then((res) => {
    resultRes.value = res
    if (res.length === 1) {
      ShiciItem.value.author = res[0].author
      ShiciItem.value.content = res[0].content
      ShiciItem.value.dynasty = res[0].dynasty
      ShiciItem.value.id = res[0].id
      ShiciItem.value.title = res[0].title
    }
    counterIncrease(1)
  })
}

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
  position: relative;
}

.shici-title {
  font-size: 3rem !important;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: normal !important;
  text-transform: none !important;
}

.shici-content {
  font-size: 2.125rem !important;
  font-weight: 400;
  letter-spacing: 0.0073529412em !important;
  text-transform: none !important;
}
</style>
