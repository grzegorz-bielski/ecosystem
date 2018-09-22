<template>
    <div>
        <h2>{{ name }}: {{ strategy }}</h2>
        <canvas width="600" height="600" ref="block"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { animate, getRand } from '@/modules/ecosystem/helpers';
import { Vector } from '@/modules/ecosystem/services/Vector';
import { Liquid, Stream, Ground, Mover } from '@/modules/ecosystem/services/entities';

@Component
export default class ForceBlockOne extends Vue {
    private readonly name = 'Mover';
    private strategy = 'Force 1';
    private canvas!: HTMLCanvasElement;

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const { width, height } = this.canvas;

        const windF = new Vector(0.09, 0);
        const currentF = new Vector(-0.09, 0);

        const ground = new Ground(ctx, width, 2, 0, height - 2);
        const liquid = new Liquid(ctx, width, height, 0, height / 1.5);
        const wind = new Stream(ctx, width, height / 1.5, 0, 0);
        const movers = new Array(40)
            .fill(void 0)
            .map(() => new Mover(ctx, this.canvas, getRand(1, 5), 15, width / 2, 0));

        const frame = () => {
            ctx.clearRect(0, 0, width, height);

            liquid.render();
            wind.render();
            ground.render();

            movers.forEach(mover => {
                if (mover.isInside(liquid)) {
                    mover.applyDrag(liquid).applyForce(currentF);
                }

                if (mover.isInside(wind)) {
                    mover.applyForce(windF);
                }

                mover
                    .applyGravity()
                    .applyFriction()
                    .update()
                    .render();
            });
        };

        animate(frame);
    }
}
</script>

<style scoped>
canvas {
    /* background-color: #9d8eb9; */
}
</style>
