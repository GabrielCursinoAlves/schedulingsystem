export function expiresInToMs(expiresIn: string | number): number {
  if (typeof expiresIn === "number") return expiresIn;

  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error("Invalid format.Use ex: 30m, 2h, 1d");
  }
  
  const durationValue = Number(match[1]);
  const durationUnit = match[2];

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };

  return durationValue * multipliers[durationUnit];
}