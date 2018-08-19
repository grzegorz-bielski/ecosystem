import { Renderer, IEntity } from '@/modules/ecosystem/models/ecosystemModels';
import { Vector } from '@/modules/ecosystem/services/Vector';

export abstract class Entity {
    constructor(
        protected location: Vector,
        protected readonly renderer: Renderer,
        protected readonly size: number,
    ) {}

    public render() {
        this.renderer.fillRect(this.location.x, this.location.y, this.size, this.size);
    }
}
