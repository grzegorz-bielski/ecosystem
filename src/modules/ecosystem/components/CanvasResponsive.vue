<template>
   <div class="canvas-wrapper" tabindex="0">
       <canvas
            ref="canvas" 
            v-bind:width="canvasSizes.width + 'px'" 
            v-bind:height="canvasSizes.height + 'px'" 
        />
       <slot></slot>
   </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';

import { Vector } from '@/modules/ecosystem/services/Vector';
import { getRand, animate } from '@/modules/ecosystem/helpers';
import { RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Ship } from '@/modules/ecosystem/services/entities';

export interface CanvasProps {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    canvasSizes: { width: number; height: number };
}

@Component
export default class CanvasResponsive extends Vue {
    private readonly name = 'CanvasResponsive';

    private canvasSizes = {
        width: 800,
        height: 600,
    };

    @Provide('canvasProps')
    private provider: CanvasProps = {
        canvas: null,
        ctx: null,
        canvasSizes: this.canvasSizes,
    };

    public mounted() {
        const canvas = this.$refs.canvas as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        this.provider.canvas = canvas;
        this.provider.ctx = ctx;

        this.$nextTick(() => {
            window.addEventListener('resize', this.setCanvasSize);

            this.setCanvasSize();
        });
    }

    public beforeDestroy() {
        window.removeEventListener('resize', this.setCanvasSize);
    }

    private setCanvasSize() {
        if (this.provider.canvas) {
            this.canvasSizes = this.provider.canvas.parentElement!.getBoundingClientRect();
        }
    }
}
</script>

<style scoped>
.canvas-wrapper {
    width: 100%;
    height: 100%;

    outline: none;
}
</style>
