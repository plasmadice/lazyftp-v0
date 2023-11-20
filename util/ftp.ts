import { Redis } from "@upstash/redis";
import { FTPSession } from '@/types/index';

// prefix key with envshare
const baseKeyPrefix = "lazyftp";

export const setFTP = async (client: Redis, userId: string, ftp: FTPSession) => {
  console.log("setFTP running", userId, ftp)
  const ftpId = crypto.randomUUID()
  ftp.id = ftpId;
  const key = [baseKeyPrefix, userId].join(":");

  // TODO: Encrypt
  await client.hset(`${key}:${ftpId}`, { ftp });
}

// export const getFTPList = async (client: Redis, userId: string) => {
//   const ftpIds = await client.smembers('connections:' + userId);
//   const ftps = await Promise.all(ftpIds.map(async (ftpId) => {
//     const ftp = await client.hget<FTPSession>(ftpKeyPrefix + userId, ftpId);
//     return ftp;
//   }));
//   return ftps.sort((a, b) => b.lastAccessed - a.lastAccessed);
// }

// export const updateFTP = async (client: Redis, userId: string, ftpId: string, updatedFTP: Partial<FTPSession>) => {
//   const ftp = await client.hget<FTPSession>(ftpKeyPrefix + userId, ftpId);
//   if (!ftp) return;
//   const updatedFtp = { ...ftp, ...updatedFTP };
//   await client.hset(ftpKeyPrefix + userId, ftpId, JSON.stringify(updatedFtp));
// }

// export const deleteFTP = async (client: Redis, userId: string, ftpId: string) => {
//   await client.hdel(ftpKeyPrefix + userId, ftpId);
//   await client.srem('connections:' + userId, ftpId);
// }