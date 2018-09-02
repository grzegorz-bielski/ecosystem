import { IEntity, Renderer, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Entity } from '@/modules/ecosystem/services/entities/Entity';

export class Ground extends Entity implements IEntity {
    constructor(renderer: Renderer, width: number, height: number, x: number, y: number) {
        super(
            renderer,
            {
                checkEdges: false,
                topSpeed: Infinity,
                type: RenderTypes.Rect,
                color: 'brown',
                constants: {
                    frictionCoefficient: 0.1,
                    dragCoefficient: 0.01,
                },
                variables: {
                    mass: 100000,
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
