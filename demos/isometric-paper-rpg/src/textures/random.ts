export type Rng = () => number;

/** Fresh entropy every call — not a fixed PRNG instance. */
export function entropicRng(): Rng {
  const buf = new Uint32Array(4);
  crypto.getRandomValues(buf);
  const chaos =
    buf[0]! ^
    buf[1]! ^
    buf[2]! ^
    buf[3]! ^
    (performance.now() * 1000) |
    0 ^
    ((Math.random() * 0x1_0000_0000) | 0);

  const kind = buf[0]! % 3;
  if (kind === 0) return mulberry32(chaos);
  if (kind === 1) return xorshift32(chaos);
  return lcg32(chaos);
}

function mulberry32(seed: number): Rng {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 0x1_0000_0000;
  };
}

function xorshift32(seed: number): Rng {
  let x = seed | 0 || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) & 0x7fff_ffff) / 0x8000_0000;
  };
}

function lcg32(seed: number): Rng {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1_664_525 * s, 1) + 1_013_902_423) >>> 0;
    return s / 0x1_0000_0000;
  };
}

export function randomIndex(rng: Rng, length: number): number {
  return Math.floor(rng() * length);
}