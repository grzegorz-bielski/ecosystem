<template>
    <div 
        class="canvas-wrapper" 
        tabindex="0"

        @keydown.left="handleLeftRotate" 
        @keydown.right="handleRightRotate"
        @keydown.space="handleThrust"
    >
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
        this.ship.rotate(0.08);
    }

    public handleRightRotate(e: KeyboardEvent) {
        this.ship.rotate(-0.08);
    }

    public handleThrust() {
        this.ship.thrust(1);
    }

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        this.ship = new Ship(
            ctx,
            this.canvas,
            getRand(1, 5),
            100,
            this.canvasSizes.width / 2,
            this.canvasSizes.height / 2,
        );

        const frame = () => {
            // clear
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.restore();

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
