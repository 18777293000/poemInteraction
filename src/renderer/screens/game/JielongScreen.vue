<template>
  <v-container class="fill-height align-center flex-column jielong-background">
    <v-row id="scroll-target" class="overflow-y-auto pa-10" style="max-height: 700px">
      <v-row
        align="center"
        justify="center"
        style="height: 1000px"
        v-scroll:#scroll-target="onScroll"
      >
        <v-col cols="12">
          <v-row>
            <v-card class="mx-auto" prepend-icon="mdi-apps" subtitle="规则介绍" width="500">
              <template v-slot:title>
                <span class="font-weight-black">欢迎体验诗词接龙活动</span>
              </template>

              <v-card-text class="bg-surface-light pt-4">
                <div
                  >系统会给出一个关键字，答题要答出一句该字开头的诗句，并以句尾作为下一句的开头，共10题。</div
                >
                <div>如： 问题：请写出首字为"一"的诗句：</div>
                <div>则回答： <u>一声梧叶一声秋</u>，即算正确，</div>
                <div>下个问题需要以“秋”字为首，回答：<u>秋风起兮白云飞</u>，下同。</div>
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-timeline align="start" side="end">
              <v-timeline-item key="0" :dot-color="items[0].color" :icon="items[0].icon" fill-dot>
                <v-card>
                  <v-card-title :class="['text-h6', `bg-${items[0].color}`]">
                    白日依山尽
                  </v-card-title>
                  <v-card-text class="bg-white text--primary mt-2">
                    <p>王之涣《登鹳雀楼》</p>
                    <p>白日依山尽，黄河入海流。欲穷千里目，更上一层楼</p>
                    <v-btn
                      :color="items[0].color"
                      prepend-icon="mdi-skip-forward"
                      variant="outlined"
                      class="mt-2"
                    >
                      尽
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
              <v-timeline-item
                v-for="i in showLength"
                :key="i"
                :dot-color="shiciItems[i].color"
                :icon="shiciItems[i].icon"
                fill-dot
              >
                <v-card>
                  <v-card-title :class="['text-h6', `bg-${shiciItems[i].color}`]">
                    {{ shiciItems[i].title }}
                  </v-card-title>
                  <v-card-text class="bg-white text--primary mt-2">
                    <p>{{ shiciItems[i].name }}</p>
                    <p>{{ shiciItems[i].content }}</p>
                    <v-btn
                      :color="shiciItems[i].color"
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
        </v-col>
      </v-row>
    </v-row>
    <v-row>
      <div class="pt-3" style="min-width: 600px">
        <v-text-field v-model="answer" label="回答" class=""></v-text-field>
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
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
  }
]

const showLength = ref(0)

const shiciItems = [
  {
    title: '尽日无人看微雨',
    name: '皮日休《汴河怀古二首》',
    content: '尽日无人看微雨，鸳鸯相对浴红衣。莫近青芜岸，苹花点点秋。',
    color: 'purple-lighten-2',
    icon: 'mdi-book-variant'
  },
  {
    title: '雨前初见花间蕊',
    name: '王驾《春晴首》',
    content: '雨前初见花间蕊，雨后全无叶底花。蜂蝶纷纷过墙去，却疑春色在邻家。',
    color: 'green-lighten-1',
    icon: 'mdi-airballoon'
  },
  {
    title: '蕊黄无限当山额',
    name: '韩偓《浣溪沙·宿醉离愁慢髻鬟》',
    content: '蕊黄无限当山额，宿粉还留枕畔香。蜜意经年别苦辛，偷尝檀炷绕衣薰。',
    color: 'indigo-lighten-2',
    icon: 'mdi-layers-triple'
  },
  {
    title: '香销翠减，回首几风流',
    name: '晏殊《踏莎行·小径红稀》',
    content:
      '重寻携手处，物是人非春暮。回首青门路。乱红飞絮相逐。行色匆匆，带酒有人携去。陌上相逢否。日暮碧云合，佳人在何处。',
    color: 'purple-lighten-2',
    icon: 'mdi-book-variant'
  }
]
const answer = ref('')

const onScroll = (e): void => {
  // console.log(e.target.scrollTop)
}

const handleAnswer = (): void => {
  console.log('jielong', answer.value)
  showLength.value++
}
</script>

<style scoped>
.jielong-background {
  background-image: url('/images/background-jielong.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
