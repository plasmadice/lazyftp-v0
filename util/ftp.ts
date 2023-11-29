"use server"

import { Redis } from "@upstash/redis";
import { Connection } from '@/types/index';
import { userKeyPrefix } from "@/util/keys";
import { encrypt, decrypt } from "@/pkg/encryption";
import { toBase58 } from "@/util/base58";

const redis = Redis.fromEnv()

export const setFTP = async (userId: string, ftp: Connection) => {

  // encrypt data before sending to redis
  const { encrypted, key, iv } = await encrypt(JSON.stringify(ftp));

  const userFTPKey = userKeyPrefix + userId + ':ftp:' + toBase58(key)
  
  // save encrypted ftp data to redis
  await redis.hset(userFTPKey, { encrypted, iv }) // lazyftp:user:d492353a-efb7-49c3-8652-ec3907082283:ftp:VqxyceFx9WYP1at5ekPsGt
}

// export const getFTP = async (userId: string, ftpId: string): Connection => {
//   const userFTPId = userKeyPrefix + userId + ':ftp:' + ftpId; 

//   // const tx = redis.multi()
//   redis.hgetall(ftpPrefix + ftpId);

//   const { encrypted, iv } = await tx.exec<any>();
//   // decrypt data

//   const ftp = JSON.parse(await decrypt(encrypted, key, iv));

//   return ftp;
// }

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