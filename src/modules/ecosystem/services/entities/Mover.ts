import { IEntity, Renderer } from '@/modules/ecosystem/models/ecosystemModels';
import { Entity } from './Entity';
import { Circle } from '@/modules/ecosystem/services/shapes';

export class Mover extends Entity implements IEntity {
    constructor(
        renderer: Renderer,
        container: HTMLCanvasElement,
        mass: number,
        size: number,
        x: number,
        y: number,
    ) {
        super(
            renderer,
            {
                checkEdges: true,
                topSpeed: Infinity,
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
            new Circle(renderer),
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
