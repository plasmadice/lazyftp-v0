import { describe, it, expect } from "@jest/globals";
import { setConnection } from '@/util/db';
import { mockFTPConnection } from '@/app/connections/ftp/MockFTP';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv()

const userId = crypto.randomUUID()
const ftpId = crypto.randomUUID()

describe('FTP functions', () => {
  mockFTPConnection.id = ftpId;
  it('sets an FTP session', async () => {
    let res = await setConnection(userId, mockFTPConnection);
    // expect(redis.hset).toHaveBeenCalledWith('ftp:' + userId, ftpId, JSON.stringify(ftp));
    // expect(redis.sadd).toHaveBeenCalledWith('connections:' + userId, ftpId);
  });

  // it('gets FTP sessions', async () => {
  //   redis.smembers.mockResolvedValueOnce([ftpId]);
  //   redis.hget.mockResolvedValueOnce(ftp);
  //   const ftps = await getFTPList(mockClient, userId);
  //   expect(ftps).toEqual([ftp]);
  // });

  // it('updates an FTP session', async () => {
  //   redis.hget.mockResolvedValueOnce(ftp);
  //   const updatedFTP = { ...ftp, lastAccessed: Date.now() };
  //   await updateFTP(redis, userId, ftpId, updatedFTP);
  //   expect(redis.hset).toHaveBeenCalledWith('ftp:' + userId, ftpId, JSON.stringify(updatedFTP));
  // });

  // it('deletes an FTP session', async () => {
  //   await deleteFTP(redis, userId, ftpId);
  //   expect(redis.hdel).toHaveBeenCalledWith('ftp:' + userId, ftpId);
  //   expect(redis.srem).toHaveBeenCalledWith('connections:' + userId, ftpId);
  // });
});