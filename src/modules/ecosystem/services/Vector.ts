import { Coords } from '@/modules/ecosystem/models/ecosystemModels';
import { getRand } from '@/modules/ecosystem/services/random';

export class Vector {
    public static fromCoords(coords: Coords) {
        const { x, y }: Coords = { ...coords };

        return new Vector(x, y);
    }

    public static randomWithinRange(v: Vector) {
        return new Vector(getRand(-v.x, v.x), getRand(-v.y, v.y));
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

    public isSmallerThan(n: number) {
        return this.x < n && this.y < n;
    }

    public normalize() {
        const magnitude = this.mag();

        if (magnitude > 0) {
            return this.div(magnitude);
        }
    }

    public limit(magLimit: number) {
        if (this.mag() > magLimit) {
            return this.normalize()!.div(magLimit);
        }
    }

    // magnitude - vector length
    private mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

// location.add(velocity.add(accelaration).limit(10));
