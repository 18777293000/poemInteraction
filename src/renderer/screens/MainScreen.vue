<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { openExternal, openFile } from '@/renderer/utils'
import { useCounterStore } from '@/renderer/store/counter'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const { locale, availableLocales } = useI18n()
const { counterIncrease, setName } = useCounterStore()
const { counter, name } = storeToRefs(useCounterStore())
const theme = useTheme()
const languages = ref(['en'])
const appVersion = ref('Unknown')
const selectedFile = ref('')
const slides = ['First', 'Second']
const colors = ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4']

onMounted((): void => {
  languages.value = availableLocales

  // Get application version from package.json version string (Using IPC communication)
  getApplicationVersionFromMainProcess()
})

const getApplicationVersionFromMainProcess = (): void => {
  window.mainApi.invoke('msgRequestGetVersion').then((result: string) => {
    appVersion.value = result
  })
}

const handleClick = (value: string): void => {
  console.log(111)
  console.log('name', name.value)
}
</script>

<template>
  <v-container class="back-display">
    <v-row no-gutters align="center" class="text-center fill-height">
      <v-col v-for="n in 1" :key="n">
        <v-carousel height="500" hide-delimiter-background show-arrows="hover" cycle>
          <!-- 使用自定义按钮的话，箭头消失功能无效 -->
          <!-- <template v-slot:prev="{ props }">
              <v-btn
                color="success"
                variant="elevated"
                @click="props.onClick"
              >前进</v-btn>
            </template>
            <template v-slot:next="{ props }">
              <v-btn
                color="info"
                variant="elevated"
                @click="props.onClick"
              >后退</v-btn>
            </template> -->
          <v-carousel-item key="1">
            <v-sheet height="100%" color="#f2fdff" class="opacity-40">
              <div
                class="d-flex fill-height align-center"
                style="flex-direction: column; justify-content: space-around"
              >
                <div class="text-h2"> 诗词风采 </div>
                <div class="text-h6">
                  余昔于江陵，见天台司马子微，谓余有仙风道骨，可与神游八极之表。因著大鹏遇希有鸟赋以自广。此赋已传于世，往往人间见之。悔其少作，未穷宏达之旨，中年弃之。及读晋书，睹阮宣子大鹏赞，鄙心陋之。遂更记忆，多将旧本不同。今复存手集，岂敢传诸作者？庶可示之子弟而已。
                </div>
                <v-btn
                  variant="tonal"
                  rounded="lg"
                  elevation="24"
                  color="#177cb0"
                  size="large"
                  @click="handleClick('shici')"
                >
                  进入游戏
                </v-btn>
              </div>
            </v-sheet>
          </v-carousel-item>
          <v-carousel-item key="2">
            <v-sheet color="#f2fdff" class="opacity-40" height="100%">
              <div
                class="d-flex fill-height align-center"
                style="flex-direction: column; justify-content: space-around"
              >
                <div class="text-h2"> 飞花令 </div>
                <div class="text-h6">
                  以“飞花令”为代表的饮酒行令，其实是中国人在饮酒时的一种特有的助兴游戏。飞花令属雅令，比较高雅，没有诗词基础的人根本玩不转它，所以这种酒令也就成了文人墨客们喜爱的文字游戏，就连名字也来源于诗词之中。因唐代诗人韩翃的名诗《寒食》中有“春城无处不飞花”一句，故名“飞花令”。
                </div>
                <v-btn
                  variant="tonal"
                  rounded="lg"
                  elevation="24"
                  size="large"
                  color="#177cb0"
                  @click="handleClick('feihua')"
                >
                  进入游戏
                </v-btn>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.back-display {
  background-image: url('/images/background.jpg');
  background-repeat: no-repeat;
  background-size: cover; /* 确保背景图片覆盖整个div */
  width: 300%; /* 根据需要调整 */
  height: 100%; /* 根据需要调整 */
  position: relative;
  overflow: hidden; /* 防止背景图片移动时溢出 */

  /* 定义动画 */
  animation: movingBackgroundComplex 20s linear infinite;
}

/* 如果你想要更复杂的移动效果，例如斜向移动，你可以添加更多的关键帧 */
/* 例如，以下是一个从左上角到右下角的动画，然后再从右下角到左上角的动画 */
@keyframes movingBackgroundComplex {
  0%,
  100% {
    background-position: -20px -20px;
  }
  25% {
    background-position: 20px 20px;
  }
  50% {
    background-position: -20px 40px;
  }
  75% {
    background-position: 40px -20px; /* 向左上角移动 */
  }
}
</style>
