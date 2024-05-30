import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    name: "yangming"
  }),
  getters: {
    getCounter: (state): number => state.counter,
    getName: (state): string => state.name,
  },
  actions: {
    counterIncrease(amount: number) {
      this.counter += amount
    },
    setName(name: string){
      this.name = name;
    }
  }
})

