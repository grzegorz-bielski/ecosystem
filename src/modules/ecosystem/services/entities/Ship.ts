import { IEntity, Renderer, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Vector } from '@/modules/ecosystem/services/Vector';
import { Entity } from './Entity';

export class Ship extends Entity implements IEntity {
    constructor(
        renderer: Renderer,
        container: HTMLCanvasElement,
        mass: number,
        size: number,
        x: number,
        y: number,
        renderType: RenderTypes = RenderTypes.Triangle,
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

    public render() {
        const { location, options, renderer, theta } = this;

        const cornerA = new Vector(options.variables.width, options.variables.width / 3);
        const cornerB = new Vector(options.variables.width, -options.variables.width / 3);

        this.renderer.save();

        // rotation
        this.renderer.translate(location.x, location.y);
        this.renderer.rotate(theta);

        // triangle
        renderer.beginPath();
        renderer.moveTo(0, 0);
        renderer.lineTo(cornerA.x, cornerA.y);
        renderer.lineTo(cornerB.x, cornerB.y);
        renderer.closePath();
        renderer.fill();

        this.renderer.restore();

        // style
        renderer.fillStyle = '#FFCC00';
        renderer.fill();

        return this;
    }
}
