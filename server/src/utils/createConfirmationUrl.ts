import { v4 } from "uuid";
import { redis } from "../redis";
import { confirmUserPrefix } from "../constants/redisPrefixes";

export const createConfirmationUrl = async (
  userId: number
): Promise<string> => {
  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return process.env.CLIENT_URL + "/user/confirm/" + token;
};
