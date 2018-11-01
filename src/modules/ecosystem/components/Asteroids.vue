<template>
    <div class="canvas-wrapper" tabindex="0" @keyup.left="handleLeftRotate" @keyup.right="handleRightRotate">
        <canvas 
            class="canvas" 
            ref="block"
            v-bind:width="canvasSizes.width + 'px'" 
            v-bind:height="canvasSizes.height + 'px'" 
        />
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
    private ship!: Ship;
    private canvas!: HTMLCanvasElement;
    private canvasSizes = {
        width: 800,
        height: 600,
    };

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

        // console.log('called');

        if (!ctx) {
            return;
        }

        const { width, height } = this.canvasSizes;

        this.ship = new Ship(ctx, this.canvas, getRand(1, 5), 30, width / 2, height / 2);

        const frame = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'red';
            ctx.fillRect(this.canvasSizes.width / 2, this.canvasSizes.height / 2, 10, 10);

            this.ship.update().render();
        };

        animate(frame);

        this.$nextTick(() => {
            window.addEventListener('resize', this.setCanvasSize);

            this.setCanvasSize();
        });
    }

    public beforeDestroy() {
        window.removeEventListener('resize', this.setCanvasSize);
    }

    private setCanvasSize() {
        this.canvasSizes = this.canvas.parentElement!.getBoundingClientRect();
    }
}
</script>

<style scoped>
.canvas-wrapper {
    outline: none;
    width: 100%;
    height: 100%;
}
</style>
