<template>
    <v-container style="border: 1px solid blue;">
        <v-row
            align="center"
            justify="center"
        >
            <v-card
            height="300"
            width="250"
            >
            <v-row justify="center">
                <v-btn
                    color="success"
                    class="mt-12"
                    @click="handleVisible"
                    >
                    Show Overlay
                </v-btn>
            </v-row>
            </v-card>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {useCounterStore} from '@/renderer/store/counter'

const {setloginDialogVisible} = useCounterStore()

const handleVisible:void = () => {
    console.log('show dialog')
    setloginDialogVisible()
}

</script>

<style>

</style>