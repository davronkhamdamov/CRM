function hexToRgb(hex: string) {
    hex = hex.replace(/^#/, '');

    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export function invertColor(hex: string) {
    let { r, g, b } = hexToRgb(hex);
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;

    return rgbToHex(r, g, b);
}
