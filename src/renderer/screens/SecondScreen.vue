<template>
  <v-container>
    <v-row no-gutters align="center" class="text-center" style="">
      <v-col cols="10">
        <v-card title="诗词风采" variant="tonal">
          <v-table height="300px" fixed-header>
            <thead>
              <tr>
                <th class="text-left"> Name </th>
                <th class="text-left"> Calories </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-card-actions>
            <v-btn size="large" variant="outlined" color="blue-lighten-1" @click="upload()"
              >上传</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="2" class="my-4">
        <v-file-input accept="image/*" label="上传文件"></v-file-input>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" class="text-center" style="margin-top: 1rem">
      <v-col cols="10" style="">
        <v-card title="飞花令" variant="tonal">
          <v-table height="300px" fixed-header>
            <thead>
              <tr>
                <th class="text-left"> Name </th>
                <th class="text-left"> Calories </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-card-actions>
            <v-btn size="large" variant="outlined" color="blue-lighten-1" @click="upload2()"
              >上传</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="2" class="my-4">
        <v-file-input accept="image/*" label="上传文件"></v-file-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159
  },
  {
    name: 'Ice cream sandwich',
    calories: 237
  },
  {
    name: 'Eclair',
    calories: 262
  }
]

const upload2 = (): void => {
  window.mainApi.invoke('queryByWord', '春').then((res: any) => {
    console.log('user database', res)
  })
}

const upload = (): void => {
  window.mainApi.invoke('delete-item', 3).then((res: string) => {
    console.log('add item', res)
  })
}

onMounted((): void => {})
</script>

<style></style>
