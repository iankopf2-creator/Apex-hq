/**
 * WCAG contrast helpers for Theme AI palettes (AA target 4.5:1 body / 3:1 UI).
 * Research note: conversion often tracks contrast+hierarchy more than any "magic" hue.
 */
export function relativeLuminance(hex: string): number {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(fg: string, bg: string): number {
  const a = relativeLuminance(fg);
  const b = relativeLuminance(bg);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWcagAa(
  fg: string,
  bg: string,
  opts?: { largeText?: boolean }
): boolean {
  const min = opts?.largeText ? 3 : 4.5;
  return contrastRatio(fg, bg) >= min;
}
