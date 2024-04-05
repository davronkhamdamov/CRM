import confetti from 'canvas-confetti';

let colors = ['#FFF000', '#00FF00', '#FF0000'];
let duration = 2 * 1000;

let end = Date.now() + duration

function frame() {
    confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    })
    confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });
    confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 2 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
}

export default frame