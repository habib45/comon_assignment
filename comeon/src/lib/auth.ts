export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "Missing JWT_SECRET. Please define it in your environment variables."
    );
  }
  return new TextEncoder().encode(secret);
}


