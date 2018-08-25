import { Renderer, IEntity, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Entity } from '@/modules/ecosystem/services/Entity';

export class Liquid extends Entity implements IEntity {
    constructor(renderer: Renderer, x: number, y: number, width: number, height: number) {
        super(
            renderer,
            {
                checkEdges: false,
                topSpeed: 10,
                color: 'gray',
                type: RenderTypes.Rect,
                constants: {
                    frictionCoefficient: 0.1,
                    dragCoefficient: 0.1,
                },
                variables: {
                    mass: 10,
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
