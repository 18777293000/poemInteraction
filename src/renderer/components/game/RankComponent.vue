<template>
  <div class="rank-contain">
    <div v-show="outputRank > 1" class="rank-item item1 text-center">
      <div class="rank-item-title" style="color: #00454e">诗词小白</div>
      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
    <div v-show="outputRank > 2" class="rank-item item2 text-center">
      <div class="rank-item-title" style="color: #12575e">童生</div>

      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
    <div v-show="outputRank > 3" class="rank-item item3 text-center">
      <div class="rank-item-title" style="color: #294e7c">秀才</div>

      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
    <div v-show="outputRank > 4" class="rank-item item4 text-center">
      <div class="rank-item-title" style="color: #b28250">举人</div>

      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
    <div v-show="outputRank > 5" class="rank-item item5 text-center">
      <div class="rank-item-title" style="color: #5f98b3">贡士</div>

      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
    <div v-show="outputRank > 6" class="rank-item item6 text-center">
      <div class="rank-item-title" style="color: #625078">进士</div>

      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
    <div v-show="outputRank > 7" class="rank-item item7 text-center">
      <div class="rank-item-title" style="color: #15141c">探花</div>

      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
    <div v-show="outputRank > 8" class="rank-item item8 text-center">
      <div class="rank-item-title" style="color: #922d28">榜眼</div>

      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
    <div v-show="outputRank > 9" class="rank-item item9 text-center">
      <div class="rank-item-title" style="color: #cba264">状元</div>

      <img class="rank-img" :src="resolvePath('/images/rank/9.gif')" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineExpose, nextTick } from 'vue'
import { resolvePath } from '@/renderer/utils'
const props = defineProps(['rank'])
const outputRank = ref(1)
const rankItems = document.getElementsByClassName('rank-item')

const updateRank = (rank: number): void => {
  outputRank.value = rank
  if (rank > 1) {
    nextTick(() => {
      console.log('rankitems I:', rankItems[outputRank.value - 2])
      rankItems[outputRank.value - 2].classList.add('play')
    })
  }
}

defineExpose({
  updateRank
})
</script>
<style scoped>
.rank-contain {
  position: absolute;
  right: 0;
  transform-style: preserve-3d;
  /*表示所有子元素在3D空间中呈现*/
  transform: rotateX(0deg) rotateY(0deg);
}

.rank-item {
  position: relative;
  height: 9vh;
  transform-style: preserve-3d;
}

.rank-item-title {
  position: absolute;
  top: 50%;
  left: -100%;
  transform: translateY(-50%);
  font-weight: bolder;
}

.play {
  animation: run 3s linear;
  z-index: 10;
}

.rank-img {
  height: 9vh;
}

/*采用@keyframes 规则创建run动画。*/
@keyframes run {
  0% {
    transform: scale(1.2);
  }

  25% {
    transform: scale(1.8);
  }

  50% {
    transform: scale(2.2);
  }

  75% {
    transform: scale(1.6);
  }

  100% {
    transform: scale(1);
  }
}
</style>
