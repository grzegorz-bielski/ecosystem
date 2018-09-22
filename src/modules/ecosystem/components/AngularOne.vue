<template>
    <div>
        <h2>{{ name }}: {{ strategy }}</h2>
        <canvas @mousemove="mouseMove" width="600" height="600" ref="block"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Vector } from '@/modules/ecosystem/services/Vector';
// import { animete } from '@/modules/ecosystem/helpers/animete';
import { Rotator } from '@/modules/ecosystem/services/entities';
import { getMouseVector, animate } from '@/modules/ecosystem/helpers';

@Component
export default class ForceBlockOne extends Vue {
    private readonly name = 'Rotator';
    private strategy = 'angular';
    private canvas!: HTMLCanvasElement;
    private mouseVec!: Vector;

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const { width, height } = this.canvas;

        const rotator = new Rotator(ctx, this.canvas, 50, 50, width / 2, height / 2);

        const frame = () => {
            ctx.clearRect(0, 0, width, height);

            (this.mouseVec ? rotator.applyMouseDirection(this.mouseVec, 2) : rotator)
                .update()
                .render();
        };

        animate(frame);
    }

    public mouseMove(e: MouseEvent) {
        this.mouseVec = getMouseVector(this.canvas, e);
    }
}
</script>

<style scoped>
canvas {
    /* background-color: #9d8eb9; */
}
</style>
