<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator';

import { CanvasProps } from '@/modules/ecosystem/components/CanvasResponsive.vue';

import { Vector } from '@/modules/ecosystem/services/Vector';
import { getRand, animate } from '@/modules/ecosystem/helpers';
import { RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Ship } from '@/modules/ecosystem/services/entities';

@Component
export default class Triangle extends Vue {
    private readonly name = 'Triangle';

    @Inject('canvasProps') private canvasProps!: CanvasProps;

    private ship!: Ship;

    // public mounted() {
    //     console.log('halko');
    //     if (!this.canvasProps.canvas || !this.canvasProps.ctx) {
    //         return;
    //     }

    //     const { ctx, canvas, canvasSizes: { width, height } } = this.canvasProps;

    //     this.ship = new Ship(ctx, canvas, getRand(1, 5), 15, width / 2, height / 2);

    //     const frame = () => {
    //         ctx.clearRect(0, 0, width, height);
    //         this.ship.update().render();
    //     };

    //     animate(frame);
    // }

    public render() {
        if (!this.canvasProps.canvas || !this.canvasProps.ctx) {
            return;
        }
        const { ctx, canvas, canvasSizes: { width, height } } = this.canvasProps;
        if (!ctx) {
            return;
        }
        this.ship = new Ship(ctx, canvas, getRand(1, 5), 15, width / 2, height / 2);
        const frame = () => {
            ctx.clearRect(0, 0, width, height);
            this.ship.update().render();
        };
        animate(frame);
        return null;
    }
}
</script>
