<template>
  <canvas width="600" height="600" ref="block"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Walker } from '@/ecosystem/Walker';
import { createBlock } from '@/ecosystem/createBlock';
import { WalkerStrategy } from '@/ecosystem/models';
// import HelloWorld from '@/components/HelloWorld.vue'; //. @ is an alias to /src

@Component({})
export default class Blocks extends Vue {
    public mounted() {
        const canvas = this.$refs.block as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const walker = new Walker(
            ctx,
            { x: canvas.width / 2, y: canvas.height / 2 },
            WalkerStrategy.random,
        );

        // walker.strategy = WalkerStrategy.random;

        canvas.addEventListener('mousemove', e => {
            console.log(e.offsetX, e.offsetY);
        });

        createBlock(
            () => {
                walker.update();
            },
            () => {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                walker.render();
            },
        );
    }
}
</script>
