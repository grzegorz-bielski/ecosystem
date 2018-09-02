<template>
    <div>
        <h2>{{ name }}: {{ strategy }}</h2>
        <canvas width="600" height="600" ref="block"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Vector } from '@/modules/ecosystem/services/Vector';
import { getRand } from '@/modules/ecosystem/services/random';
import { animete } from '@/modules/ecosystem/services/animete';
import { Mover } from '@/modules/ecosystem/services/entities/Mover';

@Component
export default class ForceBlockOne extends Vue {
    private readonly name = 'Mover';
    private strategy = 'Force 2';
    private canvas!: HTMLCanvasElement;

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const { width, height } = this.canvas;

        const movers = [
            ...new Array(5).fill(void 0).map(() => {
                const n = getRand(3, 25);
                const location = Vector.randomWithinRange([50, 400]);

                return new Mover(ctx, this.canvas, n, n, location.x, location.y);
            }),
            new Mover(ctx, this.canvas, 50, 50, width / 2, height / 2),
        ];

        const frame = () => {
            ctx.clearRect(0, 0, width, height);

            movers.forEach((mover, i) => {
                movers.forEach(
                    (anotherMover, j) => i !== j && mover.applyAttraction(anotherMover, [5, 25]),
                );

                mover.update().render();
            });
        };

        animete(frame);
    }
}
</script>

<style scoped>
canvas {
    /* background-color: #9d8eb9; */
}
</style>
