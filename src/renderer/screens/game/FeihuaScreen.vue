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
                  <div class="text-subtitle-1 ma-2 pa-2">系统给出一个关键字, 玩家要在90秒内想出并输入一句含有该字的诗句。</div>
                  <div class="text-subtitle-1 ma-2 pa-2">如: 问题:请写出含有"春"的诗句：</div>
                  <div class="text-subtitle-1 ma-2 pa-2">则回答：<span class="text-h5"><u>春城无处不飞花</u></span>，即算正确，跳转到下个问题。
                  </div>
                </div>
              </v-carousel-item>
              <v-carousel-item value="2" class="">
                <div class="pa-6">
                  <h1 style="color: green;">回答正确</h1><br />
                  <p>{{ completeShici.title }}</p>
                  <p style="white-space: pre-line;margin-top:4px;">{{ addBreaksToPoem(completeShici.content) }}</p>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="4" class="">
            <v-progress-circular :color="colors[alertColor]" :model-value="time" :size="200" :width="10">
              <v-btn :class="play ? 'd-none' : ''" color="amber-lighten-4" @click="gamePlay">开始</v-btn>
              <v-expand-x-transition>
                <v-card v-show="play" class="mx-auto rounded-circle bg-amber-lighten-4" height="140" width="140">
                  <div class="d-flex fill-height align-center justify-center text-h1 circle-background">{{ currentChart
                    }}</div>
                </v-card>
              </v-expand-x-transition>
            </v-progress-circular>
          </v-col>
          <v-col cols="8" class="">
            <div>
              <v-text-field v-model="answer" label="回答" class=""></v-text-field>
            </div>
            <div>
              <v-btn prepend-icon="mdi-arrow-up-bold-box-outline" variant="tonal" block class="bg-amber-lighten-4"
                @click="handleAnswer">
                确认
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row class="d-none">
          <v-progress-linear buffer-value="30" color="orange" model-value="20" stream></v-progress-linear>
        </v-row>
      </v-col>
    </v-row>
    <div id="fireworks"><img src="/images/fireworks.png" alt=""></div>
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
const completeShici = ref({
  author: "岑安卿",
  content: "开元古名刹，独客思凄然。",
  dynasty: "元",
  id: 354527,
  title: "次王敬助见寄韵六首 其一",
})
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
  const res: string = addBreaksToPoem('天花夜逐东风来，千山万山白皑皑。三阳献瑞后土泽，六出呈巧冯夷裁。漫空冥冥柳絮起，匝地漠漠梨花开。');
  console.log("adad", res);
  // if (time.value > 0) {
  //   console.log('清楚定时器')
  //   clearInterval(timer)
  //   timer = null
  // }
  // console.log(answer.value);
  // let res: boolean = true;
  // window.mainApi.invoke('queryByWord', answer.value).then((result: Array<any>) => {
  //   console.log('fanhuizhi', result);
  //   if (result.length === 0) { res = false } else {
  //     completeShici.value.author = result[0].author;
  //     completeShici.value.content = result[0].content;
  //     completeShici.value.dynasty = result[0].dynasty;
  //     completeShici.value.id = result[0].id;
  //     completeShici.value.title = result[0].title;
  //   }
  //   if (res) {
  //     currentPage.value = 2
  //     answer.value = ''
  //   } else {
  //     currentPage.value = 0
  //   }
  //   play.value = !play.value
  //   time.value = 100
  //   alertColor.value = 0
  // });
};

const addBreaksToPoem = (poem: string): string => {
  // 使用正则表达式来匹配句尾（, . 或 ?）并添加<br>
  // 注意：g 标志表示全局搜索，即替换所有匹配的子串
  return poem.replace(/([。．?！？！])/g, function (match) {
    // 替换匹配到的字符为原字符 + <br>
    // 注意：在HTML中直接显示中文句号“。”和全角问号“？”可能需要特别处理
    // 这里假设这些字符在原始字符串中已经被正确地使用
    return match + '\n'
  })
};

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
  animation: fireworks 5s 3s infinite;
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
