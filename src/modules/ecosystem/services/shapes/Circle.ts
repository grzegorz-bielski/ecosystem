import { Shape, RenderOptions, Renderer } from '@/modules/ecosystem/models/ecosystemModels';

export class Circle implements Shape {
    constructor(private readonly ctx: Renderer) {}

    public render(options: RenderOptions) {
        this.ctx.beginPath();
        this.ctx.arc(options.location.x, options.location.y, options.width / 2, 0, 2 * Math.PI);

        this.ctx.fillStyle = options.color;
        this.ctx.fill();

        return this;
    }
}
