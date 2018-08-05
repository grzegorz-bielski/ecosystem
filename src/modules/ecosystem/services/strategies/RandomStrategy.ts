import { Strategy, RandomTendency } from '@/modules/ecosystem/services/strategies/Strategy';
import { Coords } from '@/modules/ecosystem/models/ecosystemModels';

const getRand = (min: number, max: number) => Math.random() * (max - min) + min;

export class RandomStrategy implements Strategy {
    constructor(
        private readonly tendencyCoords?: Coords,
        public readonly name: string = 'random',
    ) {}

    public update(coords: Coords, step: number = 1) {
        if (this.tendencyCoords && getRand(0, 1) < 0.25) {
            const tendencyCoords: Coords = { ...this.tendencyCoords };

            coords.x += tendencyCoords.x - coords.x < 0 ? -step : step;
            coords.y += tendencyCoords.y - coords.y < 0 ? -step : step;
            return;
        }

        coords.x += getRand(-step, step);
        coords.y += getRand(-step, step);
    }
}
