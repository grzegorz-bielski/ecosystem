import { Renderer, IEntity, RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Entity } from '@/modules/ecosystem/services/entities/Entity';

export class Liquid extends Entity implements IEntity {
    constructor(renderer: Renderer, width: number, height: number, x: number, y: number) {
        super(
            renderer,
            {
                checkEdges: false,
                topSpeed: 10,
                color: '#5ea2e8',
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
