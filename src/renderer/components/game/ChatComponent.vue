<template>
  <div class="chat-contain">
    <div v-if="outputType === 0" class="chat-start pt-3">
      <v-card class="" color="#758a99" :image="resolvePath('/images/chat-start.jpg')">
        <v-card-title class="text-center" style="color: #161823">起句</v-card-title>

        <v-card-text>
          <div class="chat-h4 text-center" style="color: #161823">{{ outputContent }}</div>
        </v-card-text>
      </v-card>
    </div>
    <div v-if="outputType === 1" class="chat-left pt-3">
      <v-card class="" max-width="400">
        <v-img
          class="align-end text-white"
          height="50"
          :src="resolvePath('/images/chat-left.png')"
          cover
        >
          <v-card-title>第{{ outputRound }}回合</v-card-title>
        </v-img>

        <v-card-subtitle class=""></v-card-subtitle>

        <v-card-text>
          <div class="chat-h4"
            ><span style="color: #ff3300">{{ getChar(true, outputContent) }}</span
            >{{ getChar(false, outputContent) }}</div
          >
        </v-card-text>

        <v-card-actions>
          <v-btn variant="text" color="orange" class="chat-btn"> —{{ outputTitle }} </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="outputType === 2" class="chat-right pt-3">
      <v-card class="text-end" min-width="400">
        <v-img
          class="align-end text-white"
          height="50"
          :src="resolvePath('/images/chat-right.png')"
          cover
        >
          <v-card-title>第{{ outputRound }}回合</v-card-title>
        </v-img>

        <v-card-subtitle class=""></v-card-subtitle>

        <v-card-text>
          <div class="chat-h4"
            ><span style="color: #40de5a">{{ getChar(true, outputContent) }}</span
            >{{ getChar(false, outputContent) }}</div
          >
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn variant="text" color="orange" class="chat-btn"> —{{ outputTitle }} </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { resolvePath } from '@/renderer/utils'
const props = defineProps(['type', 'content', 'title', 'round', 'id'])
const outputType: any = ref(0)
const outputContent: any = ref('')
const outputTitle: any = ref('')
const outputRound: any = ref(1)
const outputId: any = ref(1)

onMounted((): void => {
  outputType.value = props.type
  outputContent.value = props.content
  outputTitle.value = props.title
  outputRound.value = props.round
  outputId.value = props.id
})

const handelClick = () => {
  console.log('@子组件----我被调用了')
}

const getChar = (head: boolean, str: string): string => {
  if (head) return str[0]
  return str.slice(1)
}

defineExpose({
  handelClick
})
</script>

<style scoped>
.chat-right {
  display: flex;
  justify-content: flex-end;
}

.chat-h4 {
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 1.175;
  letter-spacing: 0.0073529412em !important;
  text-transform: none !important;
}

.chat-btn{
  font-size: 1.2rem;
}
</style>
