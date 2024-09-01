<template>
  <v-container class="fill-height justify-center reword-background">
    <div v-show="round >= 5" class="reword-contain">
      <!-- <img class="reword-img" :src="round >= 1 ? resolvePath(`/images/rank/${round}.gif`) : ''" /> -->
      <img class="reword-img" :src="resolvePath(`/images/rank/3.gif`)" />
      <v-img class="position-relative" width="58vw" :src="resolvePath('/images/bonus.jpg')">
        <div class="position-absolute reword-name">
          {{ name }}
        </div>
      </v-img>
    </div>
    <div v-show="round < 5" class="reword-contain">
      <v-img class="position-relative" width="50vw" :src="resolvePath('/images/fight.jpg')"></v-img>
    </div>

    <music-component ref="rewordMusicRef"></music-component>
  </v-container>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/renderer/store/counter'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MusicComponent from '../components/MusicComponent.vue'
import { resolvePath } from '../utils'
const { name } = storeToRefs(useCounterStore())
const route = useRoute()
const round: any = ref(0)
const rewordMusicRef = ref()
console.log(route.query)
round.value = Number(route.query.round) || 0
console.log(round.value)

onMounted(() => {
  rewordMusicRef.value.selectSong('YuZhouChangWan')
  rewordMusicRef.value.play()
})
</script>
<style scoped>
.reword-background {
  background-image: url('/images/reword-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  /* 确保背景图片覆盖整个div */
  width: 300%;
  /* 根据需要调整 */
  height: 100%;

  /* 定义动画 */
  animation: movingBackgroundComplex 30s linear infinite;
}

.reword-contain {
  box-shadow: 2px 2px 5px #000;
}

.reword-name {
  left: 22%;
  top: 27%;
  font-size: 2vw;
}

.reword-img {
  width: 8vw;
  position: absolute;
  z-index: 99;
  transform-style: preserve-3d;
  animation: run 10s linear infinite;
}

/* 如果你想要更复杂的移动效果，例如斜向移动，你可以添加更多的关键帧 */
/* 例如，以下是一个从左上角到右下角的动画，然后再从右下角到左上角的动画 */
@keyframes movingBackgroundComplex {
  0% {
    background-position: center;
  }

  25% {
    background-position: left 30% bottom 30%;
  }

  50% {
    background-position: right 30% top 30%;
  }

  75% {
    background-position: left 30% top 30%;
  }

  100% {
    background-position: right 30% bottom 30%;
  }
}

@keyframes run {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }

  25% {
    transform: rotateX(10deg) rotateY(90deg);
  }

  50% {
    transform: rotateX(0deg) rotateY(180deg);
  }

  75% {
    transform: rotateX(-10deg) rotateY(270deg);
  }

  100% {
    transform: rotateX(0deg) rotateY(360deg);
  }
}
</style>
