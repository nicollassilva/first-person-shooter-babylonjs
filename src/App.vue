<script setup lang="ts">
import GameScene from './game/core/GameScene';
import { onMounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    GameScene.getInstance().init(canvas)
});
</script>

<template>
    <canvas v-ref="canvas"></canvas>
</template>

<style scoped>
canvas {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}
</style>