export type Update = (delta: number) => void;
export type Render = () => void;

export type Renderer = CanvasRenderingContext2D;
export interface Coords {
    x: number;
    y: number;
}

export enum WalkerStrategy {
    random = 'random',
    tendency = 'tendency',
}

export interface IEntity<S> {
    update: (strategy: S) => void;
    render: () => void;
}
