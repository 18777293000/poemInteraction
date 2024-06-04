<template>
  <v-container class="fill-height feihua-background">
    <v-row align="center" justify="center" class="text-center fill-height">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <div class="text-h2 font-weight-medium">飞花令</div>
          </v-col>
          <v-col cols="12">
            <v-carousel v-model="currentPage" show-arrows="hover" height="300" hide-delimiters>
              <v-carousel-item value="0" class="">
                <div class="d-flex flex-column justify-center mb-6">
                  <div class="text-subtitle-1 ma-2 pa-2">回答错误</div>
                </div>
              </v-carousel-item>
              <v-carousel-item value="1" class="">
                <div class="d-flex flex-column justify-center mb-6">
                  <div class="text-subtitle-1 ma-2 pa-2"
                    >系统给出一个关键字, 玩家要在90秒内想出并输入一句含有该字的诗句。</div
                  >
                  <div class="text-subtitle-1 ma-2 pa-2">如: 问题:请写出含有"春"的诗句：</div>
                  <div class="text-subtitle-1 ma-2 pa-2"
                    >则回答：<span class="text-h5"><u>春城无处不飞花</u></span
                    >，即算正确，跳转到下个问题。</div
                  >
                </div>
              </v-carousel-item>
              <v-carousel-item value="2" class="">
                <div class="pa-6">
                  <h1>诗词风采</h1><br />
                  <p>（诗词展示内容）</p>
                  <p>
                    荒草何茫茫，白杨亦萧萧。 严霜九月中，送我出远郊。 四面无人居，高坟正嶣峣。
                    马为仰天鸣，风为自萧条。 幽室一已闭，千年不复朝。 千年不复朝，贤达无奈何。
                    向来相送人，各自还其家。 亲戚或余悲，他人亦已歌。 死去何所道，托体同山阿。</p
                  >
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="4" class="">
            <v-progress-circular
              :color="colors[alertColor]"
              :model-value="time"
              :size="200"
              :width="10"
            >
              <v-btn :class="play ? 'd-none' : ''" color="amber-lighten-4" @click="gamePlay"
                >开始</v-btn
              >
              <v-expand-x-transition>
                <v-card
                  v-show="play"
                  class="mx-auto rounded-circle bg-amber-lighten-4"
                  height="140"
                  width="140"
                >
                  <div
                    class="d-flex fill-height align-center justify-center text-h1 circle-background"
                    >{{ currentChart }}</div
                  >
                </v-card>
              </v-expand-x-transition>
            </v-progress-circular>
          </v-col>
          <v-col cols="8" class="">
            <div>
              <v-text-field v-model="answer" label="回答" class=""></v-text-field>
            </div>
            <div>
              <v-btn
                prepend-icon="mdi-arrow-up-bold-box-outline"
                variant="tonal"
                block
                class="bg-amber-lighten-4"
                @click="handleAnswer"
              >
                确认
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row class="d-none">
          <v-progress-linear
            buffer-value="30"
            color="orange"
            model-value="20"
            stream
          ></v-progress-linear>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useCounterStore } from '@/renderer/store/counter'

const characters = [
  '人',
  '一',
  '不',
  '天',
  '风',
  '山',
  '春',
  '我',
  '时',
  '何',
  '中',
  '来',
  '归',
  '秋',
  '长',
  '明',
  '清',
  '云',
  '行',
  '花',
  '生',
  '心',
  '君',
  '年',
  '寒',
  '平',
  '诗',
  '无',
  '谁',
  '老',
  '香',
  '自',
  '开',
  '新',
  '知',
  '今',
  '空',
  '东',
  '声',
  '青',
  '此',
  '有',
  '家',
  '江',
  '白',
  '深',
  '流',
  '回',
  '高',
  '三'
]
const { setloginDialogVisible } = useCounterStore()
const play = ref(false)
const colors = ['#4CAF50', '#FFEB3B', '#D50000']
const time = ref(100)
const alertColor = ref(0)
const answer = ref('')
const currentChart = ref('')
const currentPage = ref(1)
let timer: any = null

const gamePlay = (): void => {
  play.value = !play.value
  currentChart.value = characters[Math.floor(Math.random() * characters.length)]
  console.log('chart', currentChart.value)
  time.value = 100
  alertColor.value = 0
  timer = setInterval(() => {
    time.value--
    if (time.value === 60) {
      alertColor.value = 1
    }
    if (time.value === 30) {
      alertColor.value = 2
    }
    if (time.value === 0) {
      play.value = !play.value
    }
  }, 600)
}

const handleAnswer = (): void => {
  if (time.value > 0) {
    console.log('清楚定时器')
    clearInterval(timer)
    timer = null
  }
  console.log(answer.value)
  const res: boolean = true
  if (res) {
    currentPage.value = 2
    answer.value = ''
  } else {
    currentPage.value = 0
  }
  play.value = !play.value
  time.value = 100
  alertColor.value = 0
}

onBeforeUnmount((): void => {
  clearInterval(timer)
  timer = null
})
</script>

<style scoped>
.feihua-background {
  font-family: 'qiuhongkai' !important;
  background-image: url('/images/background-feihua.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.circle-background {
  background-image: url('/images/circle.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
