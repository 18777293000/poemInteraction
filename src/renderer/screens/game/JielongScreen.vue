<template>
    <v-container class="fill-height align-start jielong-background">

        <v-row id="scroll-target" class="overflow-y-auto border-thin" style="max-height: 600px">
            <v-row align="center" justify="center" style="height: 1000px" v-scroll:#scroll-target="onScroll">
                <v-row>
                    <v-card class="mx-auto" prepend-icon="mdi-apps" subtitle="规则介绍" width="500">
                        <template v-slot:title>
                            <span class="font-weight-black">欢迎体验诗词接龙活动</span>
                        </template>

                        <v-card-text class="bg-surface-light pt-4">
                            <div>系统会给出一个关键字，答题要答出一句该字开头的诗句，并以句尾作为下一句的开头，共10题。</div>
                            <div>如： 问题：请写出首字为"一"的诗句：</div>
                            <div>则回答： <u>一声梧叶一声秋</u>，即算正确，</div>
                            <div>下个问题需要以“秋”字为首，回答：<u>秋风起兮白云飞</u>，下同。</div>
                        </v-card-text>
                    </v-card>
                </v-row>
                <v-row>
                    <v-timeline align="start">
                        <v-timeline-item v-for="(item, i) in items" :key="i" :dot-color="item.color" :icon="item.icon"
                            fill-dot>
                            <v-card>
                                <v-card-title :class="['text-h6', `bg-${item.color}`]">
                                    Lorem Ipsum Dolor
                                </v-card-title>
                                <v-card-text class="bg-white text--primary">
                                    <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet
                                        nec ut,
                                        sed
                                        euismod convenire principes at. Est et nobis iisque percipit, an vim zril
                                        disputando
                                        voluptatibus, vix an salutandi sententiae.</p>
                                    <v-btn :color="item.color" variant="outlined" class="mt-2">
                                        Button
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </v-row>
            </v-row>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
const items: Array<any> = [
    {
        color: 'red-lighten-2',
        icon: 'mdi-star',
    },
    {
        color: 'purple-lighten-2',
        icon: 'mdi-book-variant',
    },
    {
        color: 'green-lighten-1',
        icon: 'mdi-airballoon',
    },
    {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
    },
    {
        color: 'red-lighten-2',
        icon: 'mdi-star',
    },
    {
        color: 'purple-lighten-2',
        icon: 'mdi-book-variant',
    },
    {
        color: 'green-lighten-1',
        icon: 'mdi-airballoon',
    },
    {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
    },
];

const onScroll = (e): void => {
    console.log(e.target.scrollTop)
}
</script>

<style scoped>
.jielong-background {
    background-image: url('/images/background-jielong.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>