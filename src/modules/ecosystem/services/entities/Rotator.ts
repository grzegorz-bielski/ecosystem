import { IEntity, Renderer, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { constrain } from '@/modules/ecosystem/helpers';
import { Entity } from './Entity';

export class Rotator extends Entity implements IEntity {
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
                type: RenderTypes.Rect,
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

    public render() {
        const theta = this.velocity.heading();

        this.renderer.save();

        this.renderer.translate(this.location.x, this.location.y);
        this.renderer.rotate(theta);
        this.renderer.fillRect(0, 0, this.options.variables.width, this.options.variables.height);

        this.renderer.restore();

        return this;
    }

    public update() {
        const { location, velocity, acceleration, options, ngAcceleration, ngVelocity } = this;

        this.velocity = velocity.add(acceleration).limit(options.topSpeed);
        this.location = location.add(velocity);
        this.acceleration = acceleration.clear();

        this.ngAcceleration = this.acceleration.x / 10;
        this.ngVelocity += ngAcceleration;
        this.theta += constrain(ngVelocity, 0.1);
        this.ngAcceleration = 0;

        return super.update();
    }
}
