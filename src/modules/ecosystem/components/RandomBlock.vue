<template>
    <div @mousemove="mouseMove">
        <h2>{{ name }}: {{ strategy }}</h2>
        <canvas width="600" height="600" ref="block"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Vector } from '@/modules/ecosystem/services/Vector';
import { Walker } from '@/modules/ecosystem/services/entities/Walker';
import { animete } from '@/modules/ecosystem/services/animete';

const getMouseCoords = (canvas: HTMLCanvasElement, event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    };
};

@Component
export default class RandomBlock extends Vue {
    private readonly name = 'Walker';
    private strategy = 'random';
    private walker!: Walker;
    private canvas!: HTMLCanvasElement;

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        this.walker = new Walker(ctx, this.canvas, this.canvas.width / 2, this.canvas.height / 2);

        animete(() => this.walker.update().render());
    }

    public mouseMove(e: MouseEvent) {
        if (!this.walker) {
            return;
        }

        if ((e.target as HTMLCanvasElement).nodeName !== 'CANVAS') {
            this.walker.tendency = null;
            this.strategy = 'random';
            return;
        }

        this.walker.tendency = Vector.fromCoords(getMouseCoords(this.canvas, e));
        this.strategy = 'random / tendency';
    }
}
</script>

<style scoped>
canvas {
    background-color: #d1bcd4;
}
</style>
