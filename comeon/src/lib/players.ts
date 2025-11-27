import { createHash } from "crypto";

export interface PlayerRecord {
  username: string;
  name: string;
  avatar: string;
  event: string;
  passwordHash: string;
}

export type PublicPlayer = Omit<PlayerRecord, "passwordHash">;

const players: Record<string, PlayerRecord> = {
  rebecka: {
    username: "rebecka",
    name: "Rebecka Awesome",
    avatar: "/images/avatar/rebecka.jpg",
    event: "I saw you won 500 SEK last time",
    passwordHash: "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b",
  },
  eric: {
    username: "eric",
    name: "Eric Beard",
    avatar: "/images/avatar/eric.jpg",
    event: "I saw you won 800 SEK last time!",
    passwordHash: "6fe8ecbc1deafa51c2ecf088cf364eba1ceba9032ffbe2621e771b90ea93153d",
  },
  stoffe: {
    username: "stoffe",
    name: "Stoffe Rocker",
    avatar: "/images/avatar/stoffe.jpg",
    event: "Your are a rock star",
    passwordHash: "350a770c0ec9f353e1a5629895f374fdaa299876c3870c03feb60eb4a3769d94",
  },
};

const toPublicPlayer = (record: PlayerRecord): PublicPlayer => ({
  username: record.username,
  name: record.name,
  avatar: record.avatar,
  event: record.event,
});

const hashPassword = (value: string) =>
  createHash("sha256").update(value).digest("hex");

export async function validateCredentials(
  username: string,
  password: string
): Promise<PublicPlayer | null> {
  const record = players[username];
  if (!record) {
    return null;
  }
  const hashedInput = hashPassword(password);
  if (record.passwordHash !== hashedInput) {
    return null;
  }
  return toPublicPlayer(record);
}

export function findPlayer(username: string): PublicPlayer | null {
  const record = players[username];
  return record ? toPublicPlayer(record) : null;
}


