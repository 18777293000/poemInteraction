<template>
  <v-container class="fill-height flex-column jielong-background">
    <v-progress-linear color="light-green-accent-4" height="10" rounded :model-value="progress" striped :indeterminate="progress === 0"></v-progress-linear>
    <div id="scroll-target" class="overflow-y-auto pa-10">
      <!-- v-scroll:#scroll-target="onScroll" -->
      <v-card class="mx-auto" prepend-icon="mdi-apps" subtitle="规则介绍" width="600">
        <template v-slot:title>
          <span class="font-weight-black">欢迎体验诗词接龙活动</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
          <div>系统会给出一句诗，答题要答出一句该字开头的诗句，并以句尾作为下一句的开头，共10题。</div>
          <div>如： 问题：请写出首字为"一"的诗句：</div>
          <div>则回答： <u>一声梧叶一声秋</u>，即算正确，</div>
          <div>下个问题需要以“秋”字为首，回答：<u>秋风起兮白云飞</u>，下同。</div>
        </v-card-text>
      </v-card>
      <chat-component :type="0" :content="startPoem"></chat-component>
      <chat-component v-for="(item, index) in chatLists" :key="index" :type="item.type" :content="item.content"
        :title="item.title" :round="item.round" :id="item.id"></chat-component>
    </div>
    <div id="scroll-btn">
      <div class="pt-3" style="min-width: 600px">
        <section v-show="!finish">
          <v-text-field v-model="answer" label="回答" class=""></v-text-field>
          <v-btn prepend-icon="mdi-arrow-up-bold-box-outline" variant="tonal" block class="bg-amber-lighten-4"
            @click="handleAnswer">
            确认
          </v-btn>
        </section>
        <v-expand-x-transition>
          <v-card v-show="finish" class="mx-auto" subtitle="用时xx分钟" title="挑战结束" color="#eacd76">
            <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template>
          </v-card>
        </v-expand-x-transition>
      </div>
    </div>
    <rank-component ref="rankRef"></rank-component>
    <v-snackbar :timeout="3000" color="red-accent-3" elevation="24" v-model="snackbar">
      {{ errorMeg }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import ChatComponent from '@/renderer/components/game/ChatComponent.vue';
import RankComponent from '@/renderer/components/game/RankComponent.vue';

interface IPoem {
  dynasty: string,
  author: string,
  id: number,
  title: string,
  content: string,
}

const answer: any = ref('');
const chatLists: any = ref([]);
const round: any = ref(1);
const rankRef: any = ref();
const finish: any = ref(false);
const snackbar: any = ref(false);
const errorMeg: any = ref('没有查询到诗句! ! !');
const startPoem: any = ref('');
const progress: any = ref(0);
const router = useRouter();
const prePorm = ['悠然见南山', '山中一夜雨', '日色冷青松', '山月照弹琴', '书卷满床头'];
let preSentence: string = '';
let scrollTargetDom: any = null;
let pageDom: any = null;
let timer: any = null;

const getRandomElement = (array: Array<string>): string => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

//  初始诗句初始化
startPoem.value = preSentence = getRandomElement(prePorm);

watch(round, (a: number, oldA: number) => {
  // console.log(`watch(a),a:${a},oldA:${oldA}`)
  if (oldA === 10) {
    //  当回答完第十题，olda来到10，,round比olda多1，所以可以结束了，记得清楚定时器
    finish.value = true;
    setTimeout(() => {
      router.push({
        path: '/reword',
        query: { round: Number(round.value) - 2 }
      });
    }, 4000);
    clearInterval(timer);
    timer = null;
  }
});

watch(progress, (a: number, oldA: number) => {
  // 时间到，如果没有回答完，也算结束
  if (a === 100) {
    clearInterval(timer);
    timer = null;
    finish.value = !finish.value;
    setTimeout(() => {
      router.push({
        path: '/reword',
        query: { round: Number(round.value) - 2 }
      });
    }, 4000);
  }
});

onMounted(() => {
  scrollTargetDom = document.getElementById('scroll-target');
  // 获取页面总高度  
  pageDom = document.body;
  //  添加监听函数
  window.addEventListener('resize', resizeDom);
  resizeDom();
});

const resizeDom = (): void => {
  const pageHeight: any = pageDom.clientHeight > 969 ? 969 : (pageDom.clientHeight - 48);
  scrollTargetDom.style.height = (pageHeight * 0.7) + 'px';
  //  核心，保持滚动始终在最下面，显示最新的诗词
  scrollTargetDom.scrollTop = scrollTargetDom.scrollHeight;
};

const setScrollTop = (): void => {
  nextTick(() => {
    scrollTargetDom.scrollTop = scrollTargetDom.scrollHeight;
  })
};

const compareSentence = (str1: string, str2: string): boolean => {
  // console.log(`str1: ${str1}, str2: ${str2}`);
  //  两句诗比较，第一句最后一个字和第二局最后一个字相等，返回true,否则返回false
  // 检查两个字符串是否都不为空  
  if (!str1 || !str2) {
    return false; // 或者根据实际需求处理边界情况  
  }
  // 获取第一个字符串的最后一个字符  
  const lastCharStr1 = str1[str1.length - 1];
  // 获取第二个字符串的第一个字符  
  const firstCharStr2 = str2[0];
  // 比较这两个字符是否相等  
  return lastCharStr1 === firstCharStr2;
}

//  启动倒计时现在设定300秒
const startProgress = (): void => {
  console.log(round.value)
  if (round.value === 1) {
    timer = setInterval(() => {
      progress.value = progress.value + 1;
      console.log(progress.value)
    }, 3000);
  }
};

const handleAnswer = (): void => {
  startProgress();
  if (compareSentence(preSentence, answer.value)) {
    checkDdataBase(answer.value);
  } else {
    showSnackbar("请以上一句诗的结尾作开头");
  }
};

const showSnackbar = (meg?: string): void => {
  snackbar.value = !snackbar.value;
  if (meg !== '' || !meg) {
    errorMeg.value = meg;
  }
}

//  显示排位图标
const showRank = (): void => {
  rankRef.value.updateRank(round.value);
};

const checkDdataBase = (value: string): void => {
  window.mainApi.invoke('queryByWord', value).then((res: Array<IPoem>) => {
    console.log('jielong res', res);
    //  有返回值，说明诗句没有问题
    if (res[0]) {
      const data = res[0];
      chatLists.value.push({
        type: 2,
        content: value,
        title: data.dynasty + ' · ' + data.author + '《' + deleteLongStr(data.title) + '》',
        round: round.value,
        id: data.id
      });
      //  诗句查询成功的情况才去机器人对诗
      setScrollTop();
      showRank();
      robotChat(answer.value);
    } else {
      //  诗句不存在
      showSnackbar('没有查询到诗句! ! !');
    }
  }).catch(err => {
    showSnackbar(err.message);
  });
}

const getLastChar = (str: string): string => {
  // 获取最后一个字符  
  const lastChar = str.charAt(str.length - 1);
  return lastChar
}

const deleteLongStr = (str: string): string => {
  let result: string = str;
  if (str.length > 10) {
    result = str.slice(0, 6);
    result = result + '...';
  }
  return result;
}

const robotChat = (value: string): void => {
  const lastChar: string = getLastChar(value)
  window.mainApi.invoke('queryByLastWord', lastChar).then((res: Array<IPoem>) => {
    console.log('queryByLastWord res', res);
    const data: IPoem = res[0];
    const text: string = data.content;
    //  使用正则表达式分割字符串，正则表达式匹配逗号或句号，但不包括它们本身  
    //  使用正则表达式中的括号（作为捕获组）配合`split`可能无法直接实现这一需求，  
    //  因为`split`会根据匹配项分割字符串，而不是保留分隔符之外的部分。  
    //  所以，我们使用正则表达式配合`match`方法来匹配非分隔符的部分。
    const regex = /[^，。,.]+/g;
    const sentences: Array<string> = text.match(regex) || [];
    // 过滤出包含“萝”的句子  
    let sentencesWithLuo: Array<string> = sentences.filter(sentence => sentence.includes(lastChar));
    // 去除可能由于文本开头或结尾的句号导致的空字符串  
    sentencesWithLuo = sentencesWithLuo.filter(sentence => sentence.trim() !== '').filter(sentence => sentence.startsWith(lastChar));
    // console.log(sentencesWithLuo);
    chatLists.value.push({
      type: 1,
      content: sentencesWithLuo[0],
      title: data.dynasty + ' · ' + data.author + '《' + deleteLongStr(data.title) + '》',
      round: round.value,
      id: data.id
    });
    setScrollTop();
    preSentence = sentencesWithLuo[0];
    answer.value = '';
    round.value = round.value + 1;
  }).catch((err: any): void => {
    if (err.message === "无诗词") {
      showSnackbar('无诗词');
    } else {
      showSnackbar(err.message);
    }
  })
}

onBeforeUnmount(() => {
  //  销毁监听函数
  window.removeEventListener('resize', resizeDom);
  clearInterval(timer);
  timer = null;
})
</script>

<style scoped>
.jielong-background {
  background-image: url('/images/background-jielong.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>