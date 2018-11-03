import { IEntity, Renderer } from '@/modules/ecosystem/models/ecosystemModels';
import { Triangle } from '@/modules/ecosystem/services/shapes';
import { Vector } from '@/modules/ecosystem/services/Vector';
import { Entity } from './Entity';

export class Ship extends Entity implements IEntity {
    constructor(
        renderer: Renderer,
        container: HTMLCanvasElement,
        mass: number,
        width: number,
        height: number,
        x: number,
        y: number,
    ) {
        super(
            renderer,
            {
                checkEdges: true,
                topSpeed: Infinity,
                color: '#FFF',
                constants: {
                    frictionCoefficient: 0.1,
                    dragCoefficient: 0.01,
                },
                variables: {
                    mass,
                    width,
                    height,
                },
                container,
            },
            new Triangle(renderer),
            x,
            y,
        );
    }

    public thrust(magnitude: number) {
        const thrustF = Vector.fromPolar(magnitude, this.theta).mult(-1);

        return this.applyForce(thrustF);
    }

    public rotate(theta: number) {
        this.theta += theta;

        return this;
    }

    public update() {
        const { location, velocity, acceleration, options, ngAcceleration, ngVelocity } = this;

        this.velocity = velocity.add(acceleration).limit(options.topSpeed);
        this.location = location.add(velocity);
        this.acceleration = acceleration.clear();

        this.ngVelocity += ngAcceleration;
        this.theta += ngVelocity;

        this.acceleration = acceleration.clear();

        return super.update();
    }
}
