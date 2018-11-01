<template>
    <div class="canvas-wrapper" tabindex="0" @keyup.left="handleLeftRotate" @keyup.right="handleRightRotate">
        <h2>{{ name }}</h2>
        <canvas class="canvas" ref="block"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import CanvasResponsive from '@/modules/ecosystem/components/CanvasResponsive.vue';

import { Vector } from '@/modules/ecosystem/services/Vector';
import { getRand, animate } from '@/modules/ecosystem/helpers';
import { RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Ship } from '@/modules/ecosystem/services/entities';

@Component({
    components: {
        CanvasResponsive,
    },
})
export default class Asteroids extends Vue {
    private readonly name = 'Asteroids';
    private ship!: Ship;
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

        this.ship = new Ship(ctx, this.canvas, getRand(1, 5), 15, width / 2, height / 2);

        const frame = () => {
            ctx.clearRect(0, 0, width, height);

            this.ship.update().render();
        };

        animate(frame);
    }
}
</script>

<style scoped>
.canvas {
    /* width: 100%;
    height: 100%; */
}

.canvas-wrapper {
    outline: none;
}
</style>
