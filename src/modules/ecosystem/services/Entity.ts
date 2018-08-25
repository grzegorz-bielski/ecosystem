import {
    Renderer,
    Options,
    RenderTypes,
    IEntity,
} from '@/modules/ecosystem/models/ecosystemModels';
import { Vector } from '@/modules/ecosystem/services/Vector';

export abstract class Entity implements IEntity {
    protected location: Vector;
    protected velocity: Vector;
    protected acceleration: Vector;

    constructor(
        protected readonly renderer: Renderer,
        protected readonly options: Options,
        x: number,
        y: number,
    ) {
        this.location = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
    }

    public applyGravity() {
        const gravity = new Vector(0, 0.1 * this.options.variables.mass);

        return this.applyForce(gravity);
    }

    public applyDrag(entity?: Entity) {
        const coefficient = (entity && entity.options.constants.dragCoefficient) || 0.1;
        const speed = this.velocity.mag();
        const dragMag = coefficient * speed ** 2;

        const drag = this.velocity
            .mult(-1)
            .normalize()
            .mult(dragMag);

        return this.applyForce(drag);
    }

    public applyFriction(entity?: Entity) {
        const coefficient = (entity && entity.options.constants.frictionCoefficient) || 0.01;
        const normal = 1; // simplified
        const frictionMag = coefficient * normal;

        const friction = this.velocity
            .mult(-1)
            .normalize()
            .mult(frictionMag);

        return this.applyForce(friction);
    }

    public applyForce(force: Vector) {
        const { acceleration, options } = this;

        this.acceleration = acceleration.add(force.div(options.variables.mass));

        return this;
    }

    public update() {
        if (this.options.checkEdges) {
            this.checkEdges();
        }

        return this;
    }

    public render() {
        const { options } = this;

        this.renderer.fillStyle = this.options.color;
        this.renderEntity(options.type);

        return this;
    }

    // super basic collision detections :L
    public isInside(entity: Entity) {
        const { location } = this;

        const crossedHorizontalty =
            location.x > entity.location.x &&
            location.x < entity.location.x + entity.options.variables.width;

        const crossedVertically =
            location.y > entity.location.y &&
            location.y < entity.location.y + entity.options.variables.height;

        return crossedHorizontalty && crossedVertically;
    }

    protected checkEdges() {
        const {
            options: { container },
            location,
        } = this;

        if (location.x > container.width || location.x < 0) {
            this.location.x = container.width;
            this.velocity.x *= -1;
        }

        if (location.y > container.height) {
            this.velocity.y *= -1;
            this.location.y = container.height;
        }
    }

    private renderEntity(type: RenderTypes) {
        const { location, options, renderer } = this;

        switch (type) {
            case RenderTypes.Rect:
                return renderer.fillRect(
                    location.x,
                    location.y,
                    options.variables.width,
                    options.variables.height,
                );
            case RenderTypes.Circle: {
                renderer.beginPath();
                renderer.arc(location.x, location.y, options.variables.width / 2, 0, 2 * Math.PI);
                renderer.fill();
                return;
            }
        }
    }
}
