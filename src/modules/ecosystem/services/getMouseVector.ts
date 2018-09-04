import { Vector } from '@/modules/ecosystem/services/Vector';

export const getMouseVector = (canvas: HTMLCanvasElement, event: MouseEvent): Vector => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return Vector.fromCoords({
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    });
};
