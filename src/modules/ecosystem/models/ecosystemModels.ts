export type Update = (delta: number) => void;
export type Render = () => void;

export type Renderer = CanvasRenderingContext2D;
export interface Coords {
    x: number;
    y: number;
}

export enum RenderTypes {
    Rect = 'rect',
    Circle = 'circle',
}

interface PhysicsConstants {
    frictionCoefficient: number;
    dragCoefficient: number;
}

interface PhysicsVariables {
    width: number;
    height: number;
    mass: number;
}

interface Container {
    width: number;
    height: number;
}

export interface Options {
    container: Container;
    constants: PhysicsConstants;
    variables: PhysicsVariables;
    color: string;
    topSpeed: number;
    checkEdges: boolean;
    type: RenderTypes;
}
export interface IEntity {
    update: (options?: Options) => this;
    render: (options?: Options) => this;
}
