/**
 * **Deterministic non-cryptographic hash → Base62 string**
 *
 * **AI generated.** ***Inspired by MurmurHash + xoshiro PRNG design patterns***
 *
 * ⚠️ Not suitable for cryptographic use (passwords, tokens, etc.)
 *
 * ✅ Designed for generating unique IDs, class names, etc. from strings
 *
 * Features:
 * - Deterministic from input + seed
 * - 128-bit internal state (h1–h4)
 * - Strong avalanche (multiply + rotate + xor)
 * - Unicode-safe (code points, not UTF-16 units)
 * - xoshiro-like PRNG for high-quality expansion
 * - Bias-free Base62 output using bit pooling
 *
 * @param str Input string to hash
 * @param options Optional parameters:
 *  - length: Desired output length (default: 64)
 *  - seed: Optional seed to diversify output (default: 0)
 * @returns Base62 hash string of specified length
 *
 * @example
 * hashIdString("hello world", { length: 16, seed: 42 }); // e.g. "rAwqtvF9E8xQIX75"
 * hashIdString("main-header", { length: 32, seed: 12345 }); // e.g. "pVxUxaMYQ2IBOkbmpCLdIJXf8VW9I35V"
 */
export function hashIdString(str: string, { length = 64, seed = 0 }) {
  // Base62 character set (URL + CSS safe)
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // --- Initialize 128-bit internal state (4 x 32-bit) ---
  // Seeds are mixed with input seed to diversify output space
  let h1 = 0x9e3779b9 ^ seed; // Golden ratio (arbitrary constant) + seed
  let h2 = 0x243f6a88 ^ ~seed;
  let h3 = 0xb7e15162 ^ (seed << 1);
  let h4 = 0xdeadbeef ^ (seed >>> 1);

  // --- Mix input string into state ---
  // Iterates over Unicode code points (safe for emoji, etc.)
  for (const ch of str) {
    const c = ch.codePointAt(0) as number;

    // Mix character into all states using multiply + xor
    h1 = Math.imul(h1 ^ c, 0x85ebca6b) >>> 0;
    h2 = Math.imul(h2 ^ c, 0xc2b2ae35) >>> 0;
    h3 = Math.imul(h3 ^ c, 0x27d4eb2f) >>> 0;
    h4 = Math.imul(h4 ^ c, 0x165667b1) >>> 0;

    // Bit rotation (improves avalanche / diffusion)
    h1 = (h1 << 13) | (h1 >>> 19);
    h2 = (h2 << 17) | (h2 >>> 15);
    h3 = (h3 << 11) | (h3 >>> 21);
    h4 = (h4 << 19) | (h4 >>> 13);

    // Cross-mix states to propagate entropy across all lanes
    h1 ^= h2;
    h2 ^= h3;
    h3 ^= h4;
    h4 ^= h1;
  }

  // --- Final avalanche ---
  // Ensures small input differences produce large output changes
  h1 = Math.imul(h1 ^ (h1 >>> 16), 0x85ebca6b) >>> 0;
  h2 = Math.imul(h2 ^ (h2 >>> 16), 0xc2b2ae35) >>> 0;
  h3 = Math.imul(h3 ^ (h3 >>> 16), 0x27d4eb2f) >>> 0;
  h4 = Math.imul(h4 ^ (h4 >>> 16), 0x165667b1) >>> 0;

  // --- Extra scrambling between states ---
  // Further mixes all lanes before PRNG phase
  h1 ^= h3;
  h2 ^= h4;
  h3 ^= h1;
  h4 ^= h2;

  // --- xoshiro-like PRNG ---
  // Expands 128-bit state into pseudo-random stream
  function next() {
    // Output function (rotation + multiply improves distribution)
    const result =
      Math.imul((((h1 << 5) | (h1 >>> 27)) * 5) >>> 0, 0x9e3779b9) >>> 0;

    // State transition (xoshiro-style)
    const t = h2 << 9;

    h3 ^= h1;
    h4 ^= h2;
    h2 ^= h3;
    h1 ^= h4;

    h3 ^= t;

    h4 = (h4 << 11) | (h4 >>> 21);

    return result;
  }

  // --- Generate Base62 output ---
  let res = "";

  // Bit pool to extract 6-bit chunks (Base62 ≈ 6 bits per char)
  let pool = 0;
  let bits = 0;

  while (res.length < length) {
    // Refill pool when not enough bits
    if (bits < 6) {
      pool = next();
      bits = 32;
    }

    // Extract lowest 6 bits
    const value = pool & 63;
    pool >>>= 6;
    bits -= 6;

    // Reject values >= 62 to avoid modulo bias
    if (value < 62) {
      res += chars[value];
    }
  }

  return res;
}
