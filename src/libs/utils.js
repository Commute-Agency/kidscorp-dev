export function lerp(a, b, percentage) {
    return a + (b - a) * percentage;
  }
  
  export function slugify(str) {
    const slug = str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    return slug;
  }
  
  export function clamp(min, value, max) {
    return Math.max(min, Math.min(value, max));
  }
  