<template>
    <div tabindex="0" @keyup.left="handleLeftRotate" @keyup.right="handleRightRotate">
        <h2>{{ name }}</h2>
        <canvas width="600" height="600" ref="block"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Vector } from '@/modules/ecosystem/services/Vector';
import { getRand, animate } from '@/modules/ecosystem/helpers';
import { RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Mover } from '@/modules/ecosystem/services/entities';

@Component
export default class Asteroids extends Vue {
    private readonly name = 'Asteroids';
    private canvas!: HTMLCanvasElement;

    public handleLeftRotate(e: KeyboardEvent) {
        // console.log(e);
    }

    public handleRightRotate(e: KeyboardEvent) {
        // console.log(e);
    }

    public handleRotate(e: KeyboardEvent) {
        // console.log(e);
    }

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const { width, height } = this.canvas;

        // const movers = new Array(40)
        //     .fill(void 0)
        //     .map(() => new Mover(ctx, this.canvas, getRand(1, 5), 15, width / 2, 0));

        const frame = () => {
            ctx.clearRect(0, 0, width, height);

            // movers.forEach(mover => {
            // if (mover.isInside(liquid)) {
            //     mover.applyDrag(liquid).applyForce(currentF);
            // }

            // if (mover.isInside(wind)) {
            //     mover.applyForce(windF);
            // }

            //     mover
            //         .applyGravity()
            //         .applyFriction()
            //         .update()
            //         .render();
            // });
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
