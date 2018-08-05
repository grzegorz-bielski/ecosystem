export type Update = (delta: number) => void;
export type Render = () => void;

export type Renderer = CanvasRenderingContext2D;
export interface Coords {
    x: number;
    y: number;
}

export interface IEntity {
    update: () => void;
    render: () => void;
}
