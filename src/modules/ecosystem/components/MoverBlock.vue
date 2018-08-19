<template>
    <div>
        <h2>{{ name }}: {{ strategy }}</h2>
        <canvas width="600" height="600" ref="block"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Vector } from '@/modules/ecosystem/services/Vector';
import { animete } from '@/modules/ecosystem/services/animete';
import { Mover } from '@/modules/ecosystem/services/Mover';

@Component
export default class WalkerBlock extends Vue {
    private readonly name = 'Mover';
    private strategy = 'Force';
    private mover!: Mover;
    private canvas!: HTMLCanvasElement;

    public mounted() {
        this.canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        this.mover = new Mover(ctx, new Vector(this.canvas.width / 2, this.canvas.height / 2));

        animete(
            () => this.mover.update(),
            () => {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.mover.render();
            },
        );
    }
}
</script>

<style scoped>
canvas {
    background-color: #9d8eb9;
}
</style>
