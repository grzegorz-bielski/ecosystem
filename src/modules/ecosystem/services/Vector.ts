import { Coords } from '@/modules/ecosystem/models/ecosystemModels';
import { getRand, getRange } from '@/modules/ecosystem/helpers';

export class Vector {
    public static fromCoords(coords: Coords) {
        // get clear object without any proxies
        const { x, y } = { ...coords };

        return new Vector(x, y);
    }

    public static fromPolar(r: number, theta: number) {
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);

        return new Vector(x, y);
    }

    public static randomWithinRange(step: number | number[]) {
        const [min, max] = getRange(step);

        return new Vector(getRand(min, max), getRand(min, max));
    }

    constructor(public x: number, public y: number) {}

    public *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }

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

    public heading() {
        return Math.atan2(this.y, this.x);
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
