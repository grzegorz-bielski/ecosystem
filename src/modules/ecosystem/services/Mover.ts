import { Renderer, IEntity } from '@/modules/ecosystem/models/ecosystemModels';
import { Vector } from '@/modules/ecosystem/services/Vector';
import { Entity } from '@/modules/ecosystem/services/Entity';
import { getRand } from '@/modules/ecosystem/services/random';

export class Mover extends Entity implements IEntity {
    public tendency!: Vector | null;

    constructor(
        protected renderer: Renderer,
        protected location: Vector,
        protected size: number = 5, // private step: Vector = new Vector(1, 1),
    ) // private readonly tendencyProbability: number = 0.2,
    {
        super(location, renderer, size);
    }

    public update() {
        // if (this.tendency && getRand(0, 1) < this.tendencyProbability) {
        //     this.location = this.location.add(
        //         this.tendency.sub(this.location).isSmallerThan(0) ? this.step.mult(-1) : this.step,
        //     );
        //     return;
        // }
        // this.location = this.location.add(Vector.randomWithinRange(this.step));
    }

    public render() {
        // this.renderer.fillRect(this.location.x, this.location.y, this.size, this.size);
    }
}
