import { Coords } from '@/modules/ecosystem/models/ecosystemModels';
import { getRand } from '@/modules/ecosystem/services/random';
import { getRange } from '@/modules/ecosystem/services/constrain';

export class Vector {
    public static fromCoords(coords: Coords) {
        // get clear object without any proxies
        const { x, y }: Coords = { ...coords };

        return new Vector(x, y);
    }

    public static randomWithinRange(step: number | number[]) {
        const [min, max] = getRange(step);

        return new Vector(getRand(min, max), getRand(min, max));
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
