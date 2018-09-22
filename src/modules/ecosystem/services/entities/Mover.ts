import { IEntity, Renderer, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Entity } from './Entity';

export class Mover extends Entity implements IEntity {
    constructor(
        renderer: Renderer,
        container: HTMLCanvasElement,
        mass: number,
        size: number,
        x: number,
        y: number,
        renderType: RenderTypes = RenderTypes.Circle,
    ) {
        super(
            renderer,
            {
                checkEdges: true,
                topSpeed: Infinity,
                type: renderType,
                color: 'black',
                constants: {
                    frictionCoefficient: 0.1,
                    dragCoefficient: 0.01,
                },
                variables: {
                    mass,
                    width: size,
                    height: size,
                },
                container,
            },
            x,
            y,
        );
    }

    public update() {
        const { location, velocity, acceleration, options, ngAcceleration, ngVelocity } = this;

        this.velocity = velocity.add(acceleration).limit(options.topSpeed);
        this.location = location.add(velocity);
        this.acceleration = acceleration.clear();

        this.ngVelocity += ngAcceleration;
        this.theta += ngVelocity;
        this.ngAcceleration = 0;

        return super.update();
    }
}
