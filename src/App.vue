<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GameProvider from './game/core/GameProvider'

const canvas = ref<HTMLCanvasElement | undefined>()

onMounted(() => {
    GameProvider.getInstance().init(canvas.value)
});
</script>

<template>
    <canvas ref="canvas"></canvas>
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