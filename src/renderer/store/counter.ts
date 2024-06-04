import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    loginDialogVisible: false,
    name: 'yangming',
    id: 'yj20230015',
    college: '语言文化学院'
  }),
  getters: {
    getCounter: (state): number => state.counter,
    getName: (state): string => state.name,
    getId: (state): string => state.id,
    getCollege: (state): string => state.college
  },
  actions: {
    counterIncrease(amount: number) {
      this.counter += amount
    },
    setName(name: string) {
      this.name = name
    },
    setId(id: string) {
      this.id = id
    },
    setCollege(college: string) {
      this.college = college
    },
    setloginDialogVisible() {
      this.loginDialogVisible = !this.loginDialogVisible
    }
  }
})
