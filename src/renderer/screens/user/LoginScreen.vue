<template>
  <v-container>
    <v-dialog v-model="loginDialogVisible" max-width="500" persistent>
      <v-card
        prepend-icon="mdi-account-circle"
        text=""
        title="用户登录"
        class="login-card"
        :image="resolvePath('/images/zhongLou.jpg')"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field label="姓名*" required v-model="user.name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="学号*" required v-model="user.id"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select label="学院*" :items="collegeItems" v-model="user.college"></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider color="#0eb840"></v-divider>

        <v-card-actions>
          <v-btn color="#44cef6" text="保存" variant="outlined" @click="saveUserInfo"></v-btn>

          <v-btn color="#75878a" text="取消" variant="plain" @click="closeDialog"></v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useCounterStore } from '@/renderer/store/counter'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { resolvePath } from '@/renderer/utils'

const { setloginDialogVisible, setName, setId, setCollege } = useCounterStore()
const { loginDialogVisible } = storeToRefs(useCounterStore())
const router = useRouter()
const collegeItems = [
  '语言文化学院',
  '机械工程学院',
  '计算机科学与工程学院',
  '材料科学与工程学院',
  '管理学院',
  '电气工程与自动化学院',
  '集成电路科学与工程学院',
  '化学化工学院',
  '理学院',
  '马克思主义学院',
  '环境科学与安全工程学院',
  '艺术学院',
  '海运学院',
  '聋人工学院',
  '社会发展学院',
  '华信软件学院'
]
const user = reactive({
  name: '',
  id: '',
  college: ''
})

onMounted((): void => {
  user.name = useCounterStore().getName
  user.id = useCounterStore().getId
  user.college = useCounterStore().getCollege
  // getAllUsers()
})

const closeDialog = (): void => {
  setloginDialogVisible()
  router.push({ path: '/' })
}

const saveUserInfo = (): void => {
  setName(user.name)
  setId(user.id)
  setCollege(user.college)
  setloginDialogVisible()
  updataUserInfo()
}
const updataUserInfo = (): void => {
  window.mainApi
    .invoke('add-user', { name: user.name, student_id: user.id, college: user.college })
    .then((res: string) => {
      console.log('add item', res)
    })
}

const getAllUsers = (): void => {
  window.mainApi.invoke('get-all-users').then((users: any[]) => {
    console.log('All users:', users)
  })
}
</script>

<style scoped>
.login-card {
  /* background-image: url('/images/zhongLou.jpg');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: right 0px bottom 0px; */
}
</style>
