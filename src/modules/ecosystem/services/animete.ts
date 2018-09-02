import { Update } from '@/modules/ecosystem/models/ecosystemModels';

const timestamp = () =>
    window.performance && window.performance.now ? window.performance.now() : new Date().getTime();

export const animete = (update: Update) => {
    let now;
    let delta;
    let last = timestamp();

    const frame = time => {
        // console.log(time);
        now = timestamp();
        delta = (now - last) / 1000;
        update(delta);
        last = now;

        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
};
