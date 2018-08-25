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
import { RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { animete } from '@/modules/ecosystem/services/animete';
import { Mover } from '@/modules/ecosystem/services/Mover';
import { Liquid } from '@/modules/ecosystem/services/Liquid';

@Component
export default class WalkerBlock extends Vue {
    private readonly name = 'Mover';
    private strategy = 'Force';
    // private mover!: Mover;
    private canvas!: HTMLCanvasElement;

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const { width, height } = this.canvas;

        const wind = new Vector(0.01, 0);

        const liquid = new Liquid(ctx, 0, height / 1.5, width, height);
        const movers = new Array(40)
            .fill(void 0)
            .map(() => new Mover(ctx, this.canvas, getRand(1, 5), 0, 0));

        const frame = () => {
            ctx.clearRect(0, 0, width, height);

            liquid.update().render();

            movers.forEach(mover =>
                (mover.isInside(liquid) ? mover.applyDrag(liquid) : mover)
                    .applyFriction()
                    .applyGravity()
                    .applyForce(wind)
                    .update()
                    .render(),
            );
        };

        animete(frame);
    }
}
</script>

<style scoped>
canvas {
    background-color: #9d8eb9;
}
</style>
