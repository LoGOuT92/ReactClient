//generates random int form 0 to max param
function randomInteger(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }
//generates random RGB
  function randomRgbColor(): [number, number, number] {
    const r = randomInteger(255);
    const g = randomInteger(255);
    const b = randomInteger(255);
    return [r, g, b];
  }
//generates random HEX color string
  export function randomHexColor(): string {
    const [r, g, b] = randomRgbColor();
    const hr = r.toString(16).padStart(2, "0");
    const hg = g.toString(16).padStart(2, "0");
    const hb = b.toString(16).padStart(2, "0");
    return `#${hr}${hg}${hb}`;
  }