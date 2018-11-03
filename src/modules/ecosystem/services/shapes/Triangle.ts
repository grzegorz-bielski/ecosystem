import {
    Shape,
    RenderOptions,
    Renderer,
    Orientation,
} from '@/modules/ecosystem/models/ecosystemModels';
import { Vector } from '@/modules/ecosystem/services/Vector';

interface TriangleCorners {
    A: Vector;
    B: Vector;
    C: Vector;
}

export class Triangle implements Shape {
    constructor(private readonly ctx: Renderer) {}

    public render(options: RenderOptions) {
        const corners = calculateTriangleCorners(options.width, options.height);

        this.ctx.save();

        this.rotate(options.theta, options.location);
        this.drawTriangle(corners);

        this.ctx.restore();

        this.ctx.fillStyle = options.color;
        this.ctx.fill();

        return this;
    }

    private rotate(theta: number, center: Vector) {
        this.ctx.translate(center.x, center.y);
        this.ctx.rotate(theta);
    }

    private drawTriangle({ A, B, C }: TriangleCorners) {
        this.ctx.beginPath();
        this.ctx.lineTo(A.x, A.y);
        this.ctx.lineTo(B.x, B.y);
        this.ctx.lineTo(C.x, C.y);
        this.ctx.closePath();
    }
}

const calculateCorners = {
    [Orientation.Horizontal]: calculateHorizontalCorners,
    [Orientation.Vertical]: calculateVerticalCorners,
};

function calculateTriangleCorners(
    width: number,
    height: number,
    orientation: Orientation = Orientation.Horizontal,
): TriangleCorners {
    return calculateCorners[orientation](width, height);
}

function calculateHorizontalCorners(width: number, height: number) {
    return {
        A: new Vector(-(2 / 3) * height, 0),
        B: new Vector((1 / 3) * height, -0.5 * width),
        C: new Vector((1 / 3) * height, 0.5 * width),
    };
}

function calculateVerticalCorners(width: number, height: number) {
    return {
        A: new Vector(0, -(2 / 3) * height),
        B: new Vector(-0.5 * width, (1 / 3) * height),
        C: new Vector(0.5 * width, (1 / 3) * height),
    };
}
