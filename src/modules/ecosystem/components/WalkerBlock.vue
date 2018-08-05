<template>
    <div @mousemove="mouseMove">
        <h2>{{ name }}: {{ walker.strategy.name }}</h2>
        <canvas width="600" height="600" ref="block"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Walker } from '@/modules/ecosystem/services/Walker';
import { animete } from '@/modules/ecosystem/services/animete';
import { RandomStrategy } from '@/modules/ecosystem/services/strategies/RandomStrategy';

const getMousePos = (canvas: HTMLCanvasElement, event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    };
};

@Component
export default class WalkerBlock extends Vue {
    private readonly name = 'Walker';
    private walker = new Walker(new RandomStrategy());
    private canvas!: HTMLCanvasElement;

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        this.walker.init(ctx, { x: this.canvas.width / 2, y: this.canvas.height / 2 });

        animete(
            () => this.walker.update(),
            () => {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.walker.render();
            },
        );
    }

    public mouseMove(e: MouseEvent) {
        if ((e.target as HTMLCanvasElement).nodeName !== 'CANVAS') {
            this.walker.strategy = new RandomStrategy();
            return;
        }

        this.walker.strategy = new RandomStrategy(getMousePos(this.canvas, e), 'tendency');
    }
}
</script>
