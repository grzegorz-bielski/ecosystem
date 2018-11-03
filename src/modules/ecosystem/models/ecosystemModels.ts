import { Vector } from '@/modules/ecosystem/services/Vector';

export type Update = (delta: number) => void;
export type Render = () => void;

export type Renderer = CanvasRenderingContext2D;
export interface Coords {
    x: number;
    y: number;
}

export const enum RenderTypes {
    Rect,
    Circle,
    Triangle,
}

export const enum Orientation {
    Vertical,
    Horizontal,
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

export interface RenderOptions {
    location: Vector;
    theta: number;
    width: number;
    height: number;
    color: string;
}

export interface Shape {
    render(options: RenderOptions): this;
}

export interface Options {
    container: Container;
    constants: PhysicsConstants;
    variables: PhysicsVariables;
    color: string;
    topSpeed: number;
    checkEdges: boolean;
}
export interface IEntity {
    update: (options?: Options) => this;
    render: (options?: Options) => this;
}
