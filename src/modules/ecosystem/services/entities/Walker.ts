import { Renderer, IEntity, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Vector } from '@/modules/ecosystem/services/Vector';
import { Entity } from '@/modules/ecosystem/services/entities/Entity';
import { getRand } from '@/modules/ecosystem/services/random';

// TODO: add tendency that's gets bigger when mouse is closer
export class Walker extends Entity implements IEntity {
    private readonly step: number = 1.5;
    private readonly tendencyProbability: number = 0.2;
    private _tendency!: Vector | null;

    constructor(renderer: Renderer, container: HTMLCanvasElement, x: number, y: number) {
        super(
            renderer,
            {
                checkEdges: true,
                topSpeed: 10,
                color: 'black',
                type: RenderTypes.Rect,
                constants: {
                    frictionCoefficient: 0.1,
                    dragCoefficient: 0.01,
                },
                variables: {
                    mass: 2,
                    width: 5,
                    height: 5,
                },
                container,
            },
            x,
            y,
        );
    }

    set tendency(t: Vector | null) {
        this._tendency = t;
    }

    public update() {
        if (this._tendency && getRand(0, 1) < this.tendencyProbability) {
            const delta = this._tendency.sub(this.location);

            const x = this.getStep(delta, 'x');
            const y = this.getStep(delta, 'y');

            this.location = this.location.add(new Vector(x, y));

            return super.update();
        }

        const randomLocation = Vector.randomWithinRange(this.step);
        this.location = this.location.add(randomLocation);

        return super.update();
    }

    private getStep(delta: Vector, field: 'x' | 'y') {
        return delta[field] < 0 ? -this.step : this.step;
    }
}
