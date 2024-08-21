<template>
  <v-container class="fill-height pl-10 pr-10 feihua-background">
    <v-row align="center" justify="center" class="text-center fill-height">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <div class="feihua-title font-weight-medium">飞花令</div>
            <!-- &emsp;回合数{{ answerList.length + 1 }}:正确数{{answerList.filter(i => i === 1).length }} -->
          </v-col>
          <!-- style="z-index: 12;" 加上这个让幻灯片悬在排名之上 -->
          <v-col cols="12">
            <v-carousel
              v-model="currentPage"
              :show-arrows="false"
              :height="height"
              hide-delimiters
              class=""
            >
              <v-carousel-item value="0" class="">
                <div class="pa-6">
                  <div class="d-flex justify-center align-center error-border-inner">
                    <div class="feihua-h3" style="color: #d50000">回答错误</div>
                    <div><v-img class="" :src="resolvePath('/images/jielong-error.png')" width="130"></v-img></div>
                  </div>
                </div>
              </v-carousel-item>
              <v-carousel-item value="1" class="">
                <div class="d-flex flex-column justify-center mb-6">
                  <div class="feihua-subtitle-1 ma-2 pa-2"
                    >系统给出一个关键字, 玩家要在90秒内想出并输入一句含有该字的诗句。</div
                  >
                  <div class="feihua-subtitle-1 ma-2 pa-2"
                    >如: 问题:请写出含有<span style="color: #00c853; font-size: 2rem">"春"</span
                    >的诗句：</div
                  >
                  <div class="feihua-subtitle-1 ma-2 pa-2"
                    >则回答：<span style="color: #00c853; font-size: 2rem"
                      ><u>春城无处不飞花</u></span
                    >，即算正确，跳转到下个问题。
                  </div>
                </div>
              </v-carousel-item>
              <v-carousel-item value="2" class="">
                <div class="pa-6 success-border">
                  <div class="pa-6 success-border-inner">
                    <!-- <h1 style="color: #2E7D32;">回答正确</h1><br /> -->
                    <h2 class="feihua-h4">《{{ completeShici.title }}》</h2>
                    <h3>{{ completeShici.author }}</h3>
                    <p class="feihua-h5" style="white-space: pre-line; margin-top: 4px">{{
                      addBreaksToPoem(completeShici.content)
                    }}</p>
                    <!-- <p v-for="(item, index) in slicePoem(completeShici.content)" :key="index">{{ item }}</p> -->
                  </div>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="">
        <v-row align="center" justify="start" class="text-center">
          <v-col cols="3" class="">
            <v-progress-circular
              :color="colors[alertColor]"
              :model-value="time"
              :size="200"
              :width="10"
            >
              <v-card
                v-show="!play"
                class="mx-auto rounded-circle bg-amber-lighten-4"
                height="140"
                width="140"
              >
                <div
                  class="d-flex fill-height align-center justify-center feihua-h3 circle-background"
                  style="color: #1b5e20"
                  @click="gamePlay"
                  >{{ startBtn }}</div
                >
              </v-card>
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
          <v-col cols="7" class="">
            <section v-show="!gameOver">
              <div>
                <v-text-field v-model="answer" label="回答" class=""></v-text-field>
              </div>
              <div>
                <v-btn
                  prepend-icon="mdi-arrow-up-bold-box-outline"
                  variant="tonal"
                  block
                  :disabled="btnDisabled"
                  class="bg-amber-lighten-4"
                  @click="handleAnswer"
                >
                  回答
                </v-btn>
              </div>
            </section>
            <v-expand-x-transition>
              <v-card v-show="gameOver" class="bg-amber-lighten-4 mx-auto" height="140" width="300">
                <div class="feihua-h4 pt-5">体验完成</div>
                <div class="feihua-h5 pt-5"
                  >正确回答{{ answerList.filter((i) => i === 1).length }}题</div
                >
              </v-card>
            </v-expand-x-transition>
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
    <div id="fireworks"><img :src="resolvePath('/images/fireworks.png')" alt="" /></div>
    <rank-component ref="jielongRankRef"></rank-component>
    <music-component ref="feiHuaMusicRef"></music-component>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useCounterStore } from '@/renderer/store/counter'
import { useRouter } from 'vue-router'
import RankComponent from '@/renderer/components/game/RankComponent.vue'
import MusicComponent from '@/renderer/components/MusicComponent.vue'
import { resolvePath } from '@/renderer/utils'

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
const router = useRouter()
const completeShici = ref({
  author: '-',
  content: '仙人抚我顶，结发授长生。',
  dynasty: '元',
  id: 354527,
  title: '-'
})
const colors = ['#4CAF50', '#FFEB3B', '#D50000']
const startBtn = ref('开始')
const time = ref(100)
const alertColor = ref(0)
const answer = ref('')
const currentChart = ref('')
const currentPage = ref(1)
const answerList: any = ref([])
const jielongRankRef: any = ref()
const feiHuaMusicRef = ref()
const btnDisabled: any = ref(true)
//  回答正确的回合
const gameOver: any = ref(false)
const height: any = ref(300)
let timer: any = null
let fireWordEle: any = {}
const pageDom = document.body

onMounted(() => {
  feiHuaMusicRef.value.selectSong('QianNianFengYa')
  feiHuaMusicRef.value.play()
  window.addEventListener('resize', resizeHeight)
})

const resizeHeight = (): void => {
  if (pageDom.clientHeight > 950) {
    height.value = 500
  } else if (pageDom.clientHeight > 820) {
    height.value = 400
  } else {
    height.value = 300
  }
}

const gamePlay = (): void => {
  play.value = !play.value
  btnDisabled.value = false
  startBtn.value = ''
  getNewQuestion()
  startTime()
}

const startTime = (): void => {
  timer = setInterval(() => {
    time.value--
    if (time.value === 60) {
      alertColor.value = 1
    }
    if (time.value === 30) {
      alertColor.value = 2
    }
    if (time.value === 0) {
      answerError()
      if (answerList.value.length >= 10) {
        //  用户一直静止不动，点击开始后，放置10个回合，然后也是结束游戏
        overGame()
      } else {
        setTimeout(() => {
          getNewQuestion()
          startTime()
        }, 2000)
      }
    }
  }, 600)
  //  600ms * 100 = 60s
}

const getChart = (): string => {
  return characters[Math.floor(Math.random() * characters.length)]
}

const getNewQuestion = (): void => {
  clearInterval(timer)
  timer = null
  time.value = 100
  alertColor.value = 0
  currentPage.value = 1
  currentChart.value = getChart()
  btnDisabled.value = false
}

const answerRight = (): void => {
  currentPage.value = 2
  answerList.value.push(1)
  answer.value = ''
  fireWordEle.className = 'fireworks-animation'
  jielongRankRef.value.updateRank(answerList.value.filter((i) => i === 1).length)
  if (answerList.value.length >= 10) {
    overGame()
  }
}

const answerError = (): void => {
  currentPage.value = 0
  answer.value = ''
  fireWordEle.className = ''
  answerList.value.push(0)
  if (answerList.value.length >= 10) {
    overGame()
  }
}

const toReword = (rank: number) => {
  router.push({
    path: '/reword',
    query: {
      round: Number(rank) - 1
    }
  })
}

const overGame = (): void => {
  //  回合数到达10，游戏结束，跳转到结算画面
  console.log('回合数到达10，游戏结束，跳转到结算画面')
  play.value = !play.value
  startBtn.value = '结束'
  gameOver.value = !gameOver.value
  setTimeout(() => {
    toReword(answerList.value.filter((i) => i === 1).length)
  }, 2000)
}

const handleAnswer = (): void => {
  btnDisabled.value = true
  fireWordEle = document.getElementById('fireworks')
  fireWordEle.className = ''
  if (time.value > 0) {
    // console.log('清除定时器')
    clearInterval(timer)
    timer = null
  }
  //  判断用户回答是否包含给定字符
  const isAnswerContainChart: boolean = answer.value.indexOf(currentChart.value) !== -1
  if (!isAnswerContainChart) {
    answerError()
    setTimeout(() => {
      getNewQuestion()
      startTime()
    }, 2000)
  } else {
    checkDatabase()
  }
}

const checkDatabase = (): void => {
  let res: boolean = true
  window.mainApi.invoke('queryByWord', answer.value).then((result: Array<any>) => {
    // console.log('fanhuizhi', result);
    if (result.length === 0) {
      res = false
    } else {
      completeShici.value.author = result[0].author
      completeShici.value.content = result[0].content
      completeShici.value.dynasty = result[0].dynasty
      completeShici.value.id = result[0].id
      completeShici.value.title = result[0].title
    }
    if (res) {
      answerRight()
    } else {
      answerError()
    }
    setTimeout(() => {
      getNewQuestion()
      startTime()
      console.log('answerlist', answerList.value)
    }, 4000)
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

onBeforeUnmount((): void => {
  clearInterval(timer)
  timer = null
})
</script>

<style scoped>
.feihua-title {
  font-size: 3.75rem !important;
  line-height: 1;
  letter-spacing: -0.0083333333em !important;
  text-transform: none !important;
}

.feihua-h3 {
  font-size: 3rem !important;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: normal !important;
  text-transform: none !important;
}

.feihua-h4 {
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 1.175;
  letter-spacing: 0.0073529412em !important;
  text-transform: none !important;
}

.feihua-h5 {
  font-size: 1.5rem !important;
  font-weight: 400;
  line-height: 1.333;
  letter-spacing: normal !important;
  text-transform: none !important;
}

.feihua-subtitle-1 {
  font-size: 1.6rem !important;
  font-weight: normal;
  line-height: 1.75;
  letter-spacing: 0.009375em !important;
  text-transform: none !important;
}

.feihua-background {
  font-family: 'qiuhongkai' !important;
  background-image: url('/images/background-feihua.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
}

.circle-background {
  background-image: url('/images/circle.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#fireworks {
  position: absolute;
  left: 50%;
  margin-left: -400px;
  bottom: 60%;
  margin-bottom: -400px;
  transform: scale(0);
}

.error-border-inner {
  position: relative;
  text-align: center;
  border: 2px solid red;
  border-radius: 10px;
  transition: all 0.3s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 4px solid red;
    transition: all 0.5s;
    border-radius: 10px;
    animation: clippath 3s infinite linear;
  }
}

.success-border-inner {
  position: relative;
  text-align: center;
  border: 2px solid #43a047;
  border-radius: 10px;
  transition: all 0.3s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 4px solid #2e7d32;
    transition: all 0.5s;
    border-radius: 10px;
    animation: clippath 3s infinite linear;
  }
}

@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }

  50% {
    clip-path: inset(98% 0 0 0);
  }

  75% {
    clip-path: inset(0 0 0 98%);
  }
}

.fireworks-animation {
  animation: fireworks 4s 2s;
}

@keyframes fireworks {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(0.8);
  }

  100% {
    opacity: 0;
  }
}
</style>
