<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { openExternal, openFile } from '@/renderer/utils'
import { useCounterStore } from '@/renderer/store/counter'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MusicComponent from '@/renderer/components/MusicComponent.vue'

const { locale, availableLocales } = useI18n()
const { counterIncrease, setName, setloginDialogVisible } = useCounterStore()
const { counter, name } = storeToRefs(useCounterStore())
const theme = useTheme()
const languages = ref(['en'])
const appVersion = ref('Unknown')
const mainMusicRef = ref()
const selectedFile = ref('')
const slides = ['First', 'Second']
const colors = ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4']
const router = useRouter()

onMounted((): void => {
  languages.value = availableLocales

  // Get application version from package.json version string (Using IPC communication)
  getApplicationVersionFromMainProcess()
  mainMusicRef.value.selectSong('GaoShanLiuShui')
  mainMusicRef.value.play()
})

const getApplicationVersionFromMainProcess = (): void => {
  window.mainApi.invoke('msgRequestGetVersion').then((result: string) => {
    appVersion.value = result
  })
}

const handleClick = (value: string): void => {
  switch (value) {
    case 'shici':
      router.push('/shici')
      break
    case 'feihua':
      router.push('/feihua')
      break
    case 'jielong':
      router.push('/jielong')
      break
  }
}
</script>

<template>
  <v-container class="back-display">
    <v-row no-gutters align="center" class="text-center fill-height">
      <div> </div>
      <v-col v-for="n in 1" :key="n">
        <v-carousel height="500" hide-delimiter-background show-arrows="hover" hide-delimiters>
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
                <div class="card-title"> 中华诗词数字互动体验 </div>
                <div class="card-content">
                  中国传统文化源远流长，中华诗词博大精深，徜徉在诗词的海洋里，通过趣味闯关、互动游戏的方式，感受飞花令、诗词接龙的无限魅力。
                </div>
                <v-btn
                  variant="tonal"
                  rounded="lg"
                  elevation="24"
                  color="#177cb0"
                  class="catd-btn"
                  @click="handleClick('shici')"
                >
                  开始体验
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
                <div class="card-title"> 飞花令 </div>
                <div class="card-content">
                  以“飞花令”为代表的饮酒行令，其实是中国人在饮酒时的一种特有的助兴游戏。飞花令属雅令，比较高雅，没有诗词基础的人根本玩不转它，所以这种酒令也就成了文人墨客们喜爱的文字游戏，就连名字也来源于诗词之中。因唐代名诗《寒食》中有“春城无处不飞花”一句，故名“飞花令”。
                </div>
                <v-btn
                  variant="tonal"
                  rounded="lg"
                  elevation="24"
                  class="catd-btn"
                  color="#177cb0"
                  @click="handleClick('feihua')"
                >
                  开始体验
                </v-btn>
              </div>
            </v-sheet>
          </v-carousel-item>
          <v-carousel-item key="3">
            <v-sheet color="#f2fdff" class="opacity-40" height="100%">
              <div
                class="d-flex fill-height align-center"
                style="flex-direction: column; justify-content: space-around"
              >
                <div class="card-title"> 诗词接龙 </div>
                <div class="card-content">
                  诗词接龙考验的是参与者的诗词造诣以及对诗词韵律的掌握。在游戏中，参与者需要根据系统给出的前一句诗句，灵活运用自己的诗词知识和想象力，接龙出一句首字与前一句末字相同的新诗句。这要求参与者熟悉古代诗词的常用词汇、典故和修辞手法，能够在有限的时间内迅速构思出符合要求的诗句。
                </div>
                <v-btn
                  variant="tonal"
                  rounded="lg"
                  elevation="24"
                  class="catd-btn"
                  color="#177cb0"
                  @click="handleClick('jielong')"
                >
                  开始体验
                </v-btn>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <music-component ref="mainMusicRef"></music-component>
  </v-container>
</template>

<style scoped>
.back-display {
  background-image: url('/images/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  /* 确保背景图片覆盖整个div */
  width: 300%;
  /* 根据需要调整 */
  height: 100%;
  /* 根据需要调整 */
  position: relative;
  overflow: hidden;
  /* 防止背景图片移动时溢出 */

  /* 定义动画 */
  animation: movingBackgroundComplex 30s infinite alternate ease-in-out;
}

.card-title {
  font-size: 3.75rem !important;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.0083333333em !important;
  text-transform: none !important;
}

.card-content {
  font-size: 2rem !important;
  font-weight: 550;
  line-height: 1.6;
  letter-spacing: 0.0125em !important;
  text-transform: none !important;
}

.catd-btn {
  font-size: 1.6rem;
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
</style>
