import { Renderer, Coords, IEntity } from '@/modules/ecosystem/models/ecosystemModels';
import { Strategy } from '@/modules/ecosystem/services/strategies/Strategy';

export class Walker implements IEntity {
    public coords!: Coords;

    private readonly size: number = 5;
    private renderer!: Renderer;

    constructor(private walkerStrategy: Strategy) {}

    public init(renderer: Renderer, coords: Coords) {
        this.renderer = renderer;
        this.coords = coords;
    }

    public set strategy(strategy: Strategy) {
        this.walkerStrategy = strategy;
    }

    public get strategy() {
        return this.walkerStrategy;
    }

    public update() {
        this.walkerStrategy.update(this.coords);
    }

    public render() {
        this.renderer.fillRect(this.coords.x, this.coords.y, this.size, this.size);
    }
}
