import { Coords } from '@/modules/ecosystem/models/ecosystemModels';
import { getRand } from '@/modules/ecosystem/services/random';

export class Vector {
    public static fromCoords(coords: Coords) {
        const { x, y }: Coords = { ...coords };

        return new Vector(x, y);
    }

    public static randomWithinRange(step: number) {
        return new Vector(getRand(-step, step), getRand(-step, step));
    }

    constructor(public x: number, public y: number) {}

    public add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    public sub(v: Vector) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    public mult(n: number) {
        return new Vector(this.x * n, this.y * n);
    }

    public div(n: number) {
        return new Vector(this.x / n, this.y / n);
    }

    public clear() {
        return this.mult(0);
    }

    public normalize(): Vector {
        const magnitude = this.mag();

        return magnitude > 0 ? this.div(magnitude) : this;
    }

    public limit(magLimit: number) {
        return this.mag() > magLimit ? this.normalize().div(magLimit) : this;
    }

    public mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}
