<template>
  <v-container class="fill-height flex-column jielong-background">
    <v-progress-linear color="light-green-accent-4" height="10" rounded :model-value="progress" striped
      :indeterminate="progress === 0"></v-progress-linear>
    <div id="scroll-target" class="overflow-y-auto pa-10">
      <!-- v-scroll:#scroll-target="onScroll" -->
      <v-card class="mx-auto" prepend-icon="mdi-apps" subtitle="规则介绍" width="600">
        <template v-slot:title>
          <span class="font-weight-black">欢迎体验诗词接龙活动</span>
        </template>

        <v-card-text class="bg-surface-light pt-4 jielong-introduce">
          <div>与人机对诗，人机会给出一句诗，选手要答出一句该字开头的诗句，并以句尾作为下一句的开头，共10题。</div>
          <div>如： 问题：请写出首字为"一"的诗句：</div>
          <div>则回答： <u>一声梧叶一声秋</u>，即算正确，</div>
          <div>下个问题需要以“秋”字为首，回答：<u>秋风起兮白云飞</u>，下同。</div>
        </v-card-text>
      </v-card>
      <chat-component :type="0" :content="startPoem" ref="chatStartRef"></chat-component>
      <chat-component v-for="(item, index) in chatLists" :key="index" :type="item.type" :content="item.content"
        :title="item.title" :round="item.round" :id="item.id"></chat-component>
    </div>
    <div id="scroll-btn">
      <div class="pt-3" style="min-width: 600px">
        <section v-show="!finish" style="border: 2px solid #0eb83a; border-radius: 10px; padding: 4px">
          <v-text-field v-model="answer" label="回答"></v-text-field>
          <v-btn prepend-icon="mdi-arrow-up-bold-box-outline" variant="tonal" block
            class="bg-amber-lighten-4 jielong-btn" @click="handleAnswer">
            确认
          </v-btn>
        </section>
        <v-expand-x-transition>
          <v-card v-show="finish" class="mx-auto" subtitle="" title="挑战结束" color="#eacd76">
            <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template>
          </v-card>
        </v-expand-x-transition>
      </div>
    </div>
    <rank-component ref="rankRef"></rank-component>
    <music-component ref="jieLongMusicRef"></music-component>
    <v-snackbar :timeout="3000" color="red-accent-3" elevation="24" v-model="snackbar">
      {{ errorMeg }}
    </v-snackbar>
    <v-alert border="top" type="warning" variant="outlined" prominent class="jielong-alert" color="#ff0000">
      由于词库有限，存在部分诗词未收录，仅以体验为主！
    </v-alert>
    <div class="daan-list">
      <v-btn v-for="(i, index) in daanList" :key="index" v-show="i.isShow" @click="touchAnswer(index)" rounded="lg"
        size="x-large" block color="#161823" style="margin-top: 1rem;">{{ i.daan }}</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import ChatComponent from '@/renderer/components/game/ChatComponent.vue'
import RankComponent from '@/renderer/components/game/RankComponent.vue'
import MusicComponent from '@/renderer/components/MusicComponent.vue'

interface IPoem {
  dynasty: string
  author: string
  id: number
  title: string
  content: string
}

const daanList = ref([
  { daan: '夜语南堂新瓦响', isShow: true },
  { daan: '久旱逢甘雨', isShow: true },
  { daan: '白句方从万玉妃', isShow: true },
  { daan: '时雨真成大有年', isShow: true },
  { daan: '月午江空桂花落', isShow: true },

])
const answer: any = ref('')
const chatLists: any = ref([])
const round: any = ref(1)
const rankRef: any = ref()
const finish: any = ref(false)
const snackbar: any = ref(false)
const errorMeg: any = ref('没有查询到诗句! ! !')
const startPoem: any = ref('')
const progress: any = ref(0)
const jieLongMusicRef = ref()
const chatStartRef = ref()
const router = useRouter()
// const prePorm = [
//   '悠然见南山',
//   '山中一夜雨',
//   '日色冷青松',
//   '山月照弹琴',
//   '书卷满床头',
//   '遂令天下父母心',
//   '世上岂无千里马',
//   '茫茫江汉上',
//   '郎骑竹马来',
//   '易求无价宝',
//   '有三秋桂子',
//   '山桃红花满上头',
//   '泉声咽危石',
//   '耳中明月珠',
//   '惟有饮者留其名',
//   '夜夜龙泉壁上鸣',
//   '素手玉房前',
//   '返关塞黑',
//   '甲光向日金鳞开',
//   '蜀江春水拍山流',
//   '或恐是同乡',
//   '绝域苍茫更何有',
//   '十里荷花',
//   '水流无限似侬愁',
//   '三星在天',
//   '总是凄凉意',
//   '绕床弄青梅',
//   '梨花落后清明',
//   '世事两茫茫',
//   '宜其家室',
//   '不重生男重生女',
//   '两三点雨山前',
//   '门前一片横塘水',
//   '崔九堂前几度闻',
//   '直上三十里',
//   '光焰万丈长',
//   '对此可以酣高楼',
//   '花底离情三月雨'
// ]
const prePorm = ['黄鹤楼前月华白', '但愿人长久', '长安一片月', '天涯共此时', '今年八月十五夜']
let preSentence: string = ''
let scrollTargetDom: any = null
let pageDom: any = null
let timer: any = null

const getRandomElement = (array: Array<string>): string => {
  const randomIndex = Math.floor(Math.random() * array.length)
  // return array[randomIndex]
  console.log('round', round.value)
  return array[round.value - 1]
}

//  初始诗句初始化
startPoem.value = preSentence = getRandomElement(prePorm)

watch(round, (a: number, oldA: number) => {
  // console.log(`watch(a),a:${a},oldA:${oldA}`)
  if (oldA === 5) {
    //  当回答完第十题，olda来到10，,round比olda多1，所以可以结束了，记得清楚定时器
    finish.value = true
    setTimeout(() => {
      router.push({
        path: '/reword',
        query: { round: Number(round.value) - 2 }
      })
    }, 4000)
    clearInterval(timer)
    timer = null
  }
})

watch(progress, (a: number, oldA: number) => {
  // 时间到，如果没有回答完，也算结束
  if (a === 100) {
    clearInterval(timer)
    timer = null
    finish.value = !finish.value
    setTimeout(() => {
      router.push({
        path: '/reword',
        query: { round: Number(round.value) - 2 }
      })
    }, 4000)
  }
})

onMounted(() => {
  jieLongMusicRef.value.selectSong('YuGuangQu')
  jieLongMusicRef.value.play()
  scrollTargetDom = document.getElementById('scroll-target')
  // 获取页面总高度
  pageDom = document.body
  //  添加监听函数
  window.addEventListener('resize', resizeDom)
  resizeDom()
})

const touchAnswer = (index: any): void => {
  daanList.value[index].isShow = false
  answer.value = daanList.value[index].daan
  handleAnswer()
}

const resizeDom = (): void => {
  const pageHeight: any = pageDom.clientHeight > 969 ? 969 : pageDom.clientHeight - 48
  scrollTargetDom.style.height = pageHeight * 0.7 + 'px'
  //  核心，保持滚动始终在最下面，显示最新的诗词
  scrollTargetDom.scrollTop = scrollTargetDom.scrollHeight
}

const setScrollTop = (): void => {
  nextTick(() => {
    scrollTargetDom.scrollTop = scrollTargetDom.scrollHeight
  })
}

const compareSentence = (str1: string, str2: string): boolean => {
  // console.log(`str1: ${str1}, str2: ${str2}`);
  //  两句诗比较，第一句最后一个字和第二局最后一个字相等，返回true,否则返回false
  // 检查两个字符串是否都不为空
  if (!str1 || !str2) {
    return false // 或者根据实际需求处理边界情况
  }
  // 获取第一个字符串的最后一个字符
  const lastCharStr1 = str1[str1.length - 1]
  // 获取第二个字符串的第一个字符
  const firstCharStr2 = str2[0]
  // 比较这两个字符是否相等
  return lastCharStr1 === firstCharStr2
}

//  启动倒计时现在设定300秒
const startProgress = (): void => {
  console.log(round.value)
  if (timer === null) {
    if (round.value === 1) {
      console.log('enter setinterval')
      timer = setInterval(() => {
        progress.value = progress.value + 1
        console.log(progress.value)
      }, 3000)
    }
  }
}

const handleAnswer = (): void => {
  startProgress()
  if (compareSentence(preSentence, answer.value)) {
    checkDdataBase(answer.value)
  } else {
    showSnackbar('请以上一句诗的结尾作开头')
  }
}

const showSnackbar = (meg?: string): void => {
  snackbar.value = !snackbar.value
  if (meg !== '' || !meg) {
    errorMeg.value = meg
  }
}

//  显示排位图标
const showRank = (): void => {
  rankRef.value.updateRank(round.value)
}

const checkDdataBase = (value: string): void => {
  window.mainApi
    .invoke('queryByWord', value)
    .then((res: Array<IPoem>) => {
      console.log('jielong res', res)
      //  有返回值，说明诗句没有问题
      if (res[0]) {
        const data = res[0]
        chatLists.value.push({
          type: 2,
          content: value,
          title: data.dynasty + ' · ' + data.author + '《' + deleteLongStr(data.title) + '》',
          round: round.value,
          id: data.id
        })
        //  诗句查询成功的情况才去机器人对诗
        setScrollTop()
        showRank()
        robotChat(answer.value)
      } else {
        //  诗句不存在
        showSnackbar('没有查询到诗句! ! !')
      }
    })
    .catch((err) => {
      showSnackbar(err.message)
    })
}

const getLastChar = (str: string): string => {
  // 获取最后一个字符
  const lastChar = str.charAt(str.length - 1)
  return lastChar
}

const deleteLongStr = (str: string): string => {
  let result: string = str
  if (str.length > 10) {
    result = str.slice(0, 6)
    result = result + '...'
  }
  return result
}

const robotChat = (value: string): void => {
  const lastChar: string = getLastChar(value)
  window.mainApi
    .invoke('queryByLastWord', lastChar)
    .then((res: Array<IPoem>) => {
      console.log('queryByLastWord res', res)
      const data: IPoem = res[0]
      const text: string = data.content
      //  使用正则表达式分割字符串，正则表达式匹配逗号或句号，但不包括它们本身
      //  使用正则表达式中的括号（作为捕获组）配合`split`可能无法直接实现这一需求，
      //  因为`split`会根据匹配项分割字符串，而不是保留分隔符之外的部分。
      //  所以，我们使用正则表达式配合`match`方法来匹配非分隔符的部分。
      const regex = /[^，。,.]+/g
      const sentences: Array<string> = text.match(regex) || []
      // 过滤出包含“萝”的句子
      let sentencesWithLuo: Array<string> = sentences.filter((sentence) =>
        sentence.includes(lastChar)
      )
      // 去除可能由于文本开头或结尾的句号导致的空字符串
      sentencesWithLuo = sentencesWithLuo
        .filter((sentence) => sentence.trim() !== '')
        .filter((sentence) => sentence.startsWith(lastChar))
      // console.log(sentencesWithLuo);
      chatLists.value.push({
        type: 1,
        content: sentencesWithLuo[0],
        title: data.dynasty + ' · ' + data.author + '《' + deleteLongStr(data.title) + '》',
        round: round.value,
        id: data.id
      })
      setScrollTop()
      preSentence = sentencesWithLuo[0]
      answer.value = ''
      round.value = round.value + 1

      // -------------------------------
      setTimeout(() => {
        startPoem.value = preSentence = getRandomElement(prePorm)
        chatStartRef.value.handelClick(startPoem.value)
        chatLists.value = []
      }, 3000);
    })
    .catch((err: any): void => {
      if (err.message === '无诗词') {
        showSnackbar('无诗词')
      } else {
        showSnackbar(err.message)
      }
    })
}

onBeforeUnmount(() => {
  //  销毁监听函数
  window.removeEventListener('resize', resizeDom)
  clearInterval(timer)
  timer = null
})
</script>

<style scoped>
.jielong-background {
  background-image: url('/images/background-jielong.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.jielong-btn {
  font-size: 1.4rem;
}

.jielong-introduce div {
  font-size: 1.2rem;
}

.daan-list {
  position: absolute;
  left: 0;
  top: 20%;
}

.jielong-alert {
  position: absolute;
  right: 0;
  top: 30px;
  height: 70px;
  width: 490px;
}
</style>
