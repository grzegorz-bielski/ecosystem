import { Renderer, Coords, IEntity, WalkerStrategy } from './models';

type StrategyImpl = { [key in WalkerStrategy]: () => void };

export const getRand = (min: number, max: number) => Math.random() * (max - min) + min;

export class Walker implements IEntity<WalkerStrategy> {
    private readonly size: number = 5;

    private readonly strategies: StrategyImpl = {
        [WalkerStrategy.random]: () => this.random(),
        [WalkerStrategy.tendency]: () => this.tendency(),
    };

    constructor(
        private readonly renderer: Renderer,
        private coords: Coords,
        private strategy: WalkerStrategy,
    ) {}

    public setStrategy(strategy: WalkerStrategy) {
        this.strategy = strategy;
    }

    public update() {
        this.strategies[this.strategy]();
    }

    public render() {
        this.renderer.fillRect(this.coords.x, this.coords.y, this.size, this.size);
    }

    private random() {
        this.coords.x += getRand(-1, 1);
        this.coords.y += getRand(-1, 1);
    }

    private tendency() {}
}
