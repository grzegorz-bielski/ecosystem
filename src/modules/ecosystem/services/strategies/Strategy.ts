import { Coords } from '@/modules/ecosystem/models/ecosystemModels';

export interface RandomTendency {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export interface Strategy {
    update(coords: Coords): void;
}
