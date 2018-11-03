import { Shape, RenderOptions, Renderer } from '@/modules/ecosystem/models/ecosystemModels';

export class Rect implements Shape {
    constructor(private readonly ctx: Renderer) {}

    public render(options: RenderOptions) {
        this.ctx.fillStyle = options.color;
        this.ctx.fillRect(options.location.x, options.location.y, options.width, options.height);

        return this;
    }
}
