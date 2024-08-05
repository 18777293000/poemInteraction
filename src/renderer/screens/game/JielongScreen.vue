<template>
  <v-container class="fill-height flex-column jielong-background">
    <div id="scroll-target" class="overflow-y-auto pa-10 border-lg">
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
      <chat-component :type="0"></chat-component>
      <chat-component v-for="(item, index) in chatLists" :key="index" :type="item.type" :content="item.content" :title="item.title" :round="item.round"></chat-component>
    </div>
    <div id="scroll-btn">
      <div class="pt-3 border-lg" style="min-width: 600px">
        <v-text-field v-model="answer" label="回答" class=""></v-text-field>
        <v-btn prepend-icon="mdi-arrow-up-bold-box-outline" variant="tonal" block class="bg-amber-lighten-4"
          @click="handleAnswer">
          确认
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, createVNode, render } from 'vue';
import ChatComponent from '@/renderer/components/game/ChatComponent.vue';
const items: Array<any> = [
  {
    color: 'red-lighten-2',
    icon: 'mdi-star'
  },
  {
    color: 'purple-lighten-2',
    icon: 'mdi-book-variant'
  },
  {
    color: 'green-lighten-1',
    icon: 'mdi-airballoon'
  },
  {
    color: 'indigo-lighten-2',
    icon: 'mdi-layers-triple'
  },
  {
    color: 'red-lighten-2',
    icon: 'mdi-star'
  },
  {
    color: 'purple-lighten-2',
    icon: 'mdi-book-variant'
  },
  {
    color: 'green-lighten-1',
    icon: 'mdi-airballoon'
  },
  {
    color: 'indigo-lighten-2',
    icon: 'mdi-layers-triple'
  },
  {
    color: 'orange-darken-4',
    icon: 'mdi-call-split',
  },
  {
    color: 'brown-darken-1',
    icon: 'mdi-message-text',
  }
]

const titleQuestion = ref({
  showTitle: '白日依山尽', // 这个属性放用户自己输入的句子
  title: '王之涣《登鹳雀楼》',
  content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。',
  color: 'blue-darken-2',
  icon: 'mdi-antenna',
})

const shiciItems: Array<any> = [];
const answer:any = ref('');
let scrollTargetDom: any = null;
let pageDom: any = null;
const chatLists: any = ref([]);

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
}

const handleAnswer = (): void => {
  console.log('jielong', answer.value)
  chatLists.value.push({
    type: 1,
    content: '123',
    title: '456',
    round: 1,
  })
}

const checkDdataBase = (): void => {
  window.mainApi.invoke('queryByWord', answer.value).then((res: any) => {
    console.log('jielong res', res);
    //  有返回值，说明诗句没有问题
    shiciItems.push(res);
  });
}

onBeforeUnmount(() => {
  //  销毁监听函数
  window.removeEventListener('resize', resizeDom);
})
</script>

<style scoped>
.jielong-background {
  background-image: url('/images/background-jielong.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
<!-- <v-col cols="12">
  <v-row>
    <v-timeline align="start" side="end" class="border-lg">
      <v-timeline-item key="0" :dot-color="titleQuestion.color" :icon="titleQuestion.icon" fill-dot>
        <v-card>
          <v-card-title :class="['text-h6', `bg-${titleQuestion.color}`]">
            {{ titleQuestion.showTitle }}
          </v-card-title>
          <v-card-text class="bg-white text--primary mt-2">
            <p>{{ titleQuestion.title }}</p>
            <p>{{ titleQuestion.content }}</p>
            <v-btn
              :color="titleQuestion.color"
              prepend-icon="mdi-skip-forward"
              variant="outlined"
              class="mt-2"
            >
              尽投
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item
        v-for="i in showLength"
        :key="i"
        :dot-color="items[i].color"
        :icon="items[i].icon"
        fill-dot
      >
        <v-card>
          <v-card-title :class="['text-h6', `bg-${items[i].color}`]">
            {{ shiciItems[i].title }}
          </v-card-title>
          <v-card-text class="bg-white text--primary mt-2">
            <p>{{ shiciItems[i].title + shiciItems[i].author }}</p>
            <p>{{ shiciItems[i].content }}</p>
            <v-btn
              :color="items[i].color"
              prepend-icon="mdi-skip-forward"
              variant="outlined"
              class="mt-2"
            >
              {{ shiciItems[i].title.substr(-1) }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-row>
</v-col> -->