import { IEntity, Renderer, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Entity } from '@/modules/ecosystem/services/Entity';

export class Mover extends Entity implements IEntity {
    constructor(
        renderer: Renderer,
        container: HTMLCanvasElement,
        mass: number,
        x: number,
        y: number,
    ) {
        super(
            renderer,
            {
                checkEdges: true,
                topSpeed: Infinity,
                type: RenderTypes.Circle,
                color: 'black',
                constants: {
                    frictionCoefficient: 0.1,
                    dragCoefficient: 0.01,
                },
                variables: {
                    mass,
                    width: 15,
                    height: 15,
                },
                container,
            },
            x,
            y,
        );
    }

    public update() {
        const { location, velocity, acceleration, options } = this;

        this.velocity = velocity.add(acceleration).limit(options.topSpeed);
        this.location = location.add(velocity);
        this.acceleration = acceleration.clear();

        return super.update();
    }
}
