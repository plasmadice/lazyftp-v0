// import { UpstashRedisAdapter, UpstashRedisAdapterOptions } from './index.ts';
import { UpstashRedisAdapter, type UpstashRedisAdapterOptions } from "@auth/upstash-redis-adapter"
import type { FTPSession } from '@/types/index.d.ts';
import type { Redis } from "@upstash/redis";

interface FTPAdapterOptions extends UpstashRedisAdapterOptions {
  ftpKeyPrefix: string;
}

function FTPAdapter(
  client: Redis,
  options: FTPAdapterOptions = { baseKeyPrefix: "lazyftp:", ftpKeyPrefix: "ftp:" }
) {
  const baseAdapter = UpstashRedisAdapter(client, options);
  const ftpKeyPrefix = options.baseKeyPrefix + options.ftpKeyPrefix;

  const setFTP = async (userId: string, ftp: FTPSession) => {
    const ftpKey = ftpKeyPrefix + userId;
    await client.set(ftpKey, JSON.stringify(ftp));
  }

  const getFTPs = async (userId: string) => {
    const ftps = await client.get<FTPSession[]>(ftpKeyPrefix + userId);
    if (!ftps) return null;
    return ftps.sort((a, b) => b.lastAccessed - a.lastAccessed);
  }

  const deleteFTP = async (userId: string, ftpId: string) => {
    const ftps = await getFTPs(userId);
    if (!ftps) return;
    const updatedFTPs = ftps.filter(ftp => ftp.id !== ftpId);
    await client.set(ftpKeyPrefix + userId, JSON.stringify(updatedFTPs));
  }

  return {
    ...baseAdapter,
    setFTP,
    getFTPs,
    deleteFTP,
  }
}

export { FTPAdapter, type FTPAdapterOptions };