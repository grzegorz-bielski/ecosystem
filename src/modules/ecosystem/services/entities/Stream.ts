import { IEntity, Renderer, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Entity } from '@/modules/ecosystem/services/entities/Entity';

export class Stream extends Entity implements IEntity {
    constructor(renderer: Renderer, width: number, height: number, x: number, y: number) {
        super(
            renderer,
            {
                checkEdges: true,
                topSpeed: Infinity,
                type: RenderTypes.Rect,
                color: '#e7f6ff',
                constants: {
                    frictionCoefficient: 0.1,
                    dragCoefficient: 0.01,
                },
                variables: {
                    mass: 1,
                    width,
                    height,
                },
                container: {
                    width: 0,
                    height: 0,
                },
            },
            x,
            y,
        );
    }
}