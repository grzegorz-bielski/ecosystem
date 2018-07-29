import { Update, Render } from './models';

const timestamp = () =>
    window.performance && window.performance.now ? window.performance.now() : new Date().getTime();

export const createBlock = (update: Update, render: Render) => {
    let now;
    let delta;
    let last = timestamp();

    const frame = () => {
        now = timestamp();
        delta = (now - last) / 1000;
        update(delta);
        render();
        last = now;

        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
};
