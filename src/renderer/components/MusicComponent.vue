<template>
  <div class="music-contain">
    <audio ref="audioGaoShanLiuShui" src="/public/bgm/GaoShanLiuShui.mp3" loop></audio>
    <audio ref="audioChunJiangHuaYueYe" src="/public/bgm/ChunJiangHuaYueYe.mp3" loop></audio>
    <audio ref="audioQianNianFengYa" src="/public/bgm/QianNianFengYa.mp3" loop></audio>
    <audio ref="audioYuGuangQu" src="/public/bgm/YuGuangQu.mp3" loop></audio>
    <audio ref="audioYuZhouChangWan" src="/public/bgm/YuZhouChangWan.mp3" loop></audio>

    <v-avatar
      id="music-btn"
      class="music-btn"
      @click="onClick"
      :image="resolvePath('/images/music-icon.png')"
      size="80"
    ></v-avatar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { resolvePath } from '@/renderer/utils'

interface Song {
  id: number
  title: string
  artist: string
  url: string
}

const currentSong = ref<HTMLAudioElement | null>(null)

const audioGaoShanLiuShui = ref<HTMLAudioElement | null>(null)
const audioChunJiangHuaYueYe = ref<HTMLAudioElement | null>(null)
const audioQianNianFengYa = ref<HTMLAudioElement | null>(null)
const audioYuGuangQu = ref<HTMLAudioElement | null>(null)
const audioYuZhouChangWan = ref<HTMLAudioElement | null>(null)

let musicBtnDom: any = null
let ifPlay: boolean = true

onMounted(() => {
  musicBtnDom = document.getElementById('music-btn')
})

const play = () => {
  // console.log('audio:', currentSong.value)
  musicBtnDom.classList.add('play')
  if (currentSong.value) {
    currentSong.value.play()
  }
}

const pause = () => {
  musicBtnDom.classList.remove('play')
  if (currentSong.value) {
    currentSong.value.pause()
  }
}

const onClick = () => {
  ifPlay = !ifPlay
  ifPlay ? play() : pause()
}

const selectSong = (name: string): void => {
  // console.log('select song:', name)
  switch (name) {
    case 'GaoShanLiuShui':
      currentSong.value = audioGaoShanLiuShui.value
      break
    case 'ChunJiangHuaYueYe':
      currentSong.value = audioChunJiangHuaYueYe.value
      break
    case 'QianNianFengYa':
      currentSong.value = audioQianNianFengYa.value
      break
    case 'YuGuangQu':
      currentSong.value = audioYuGuangQu.value
      break
    case 'YuZhouChangWan':
      currentSong.value = audioYuZhouChangWan.value
      break
  }
}

defineExpose({
  selectSong,
  play
})
</script>
<style scoped>
.music-contain {
  position: absolute;
  left: 10px;
  bottom: 10px;
}
.music-btn:hover {
  cursor: pointer;
  box-shadow: 2px 2px 5px #000;
}

.play {
  animation: rotate 14s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
