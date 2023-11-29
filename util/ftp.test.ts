import { describe, it, expect } from "@jest/globals";
import { setFTP } from './ftp';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv()

const userId = 'testUser';
const ftpId = crypto.randomUUID()
const ftp = { 
  id: ftpId, 
  lastAccessed: Date.now(),
  host: 'test.rebex.net/',
  port: 21,
  username: 'demo',
  password: 'password',
};

describe('FTP functions', () => {
  it('sets an FTP session', async () => {
    let res = await setFTP(redis, userId, ftp);
    expect(redis.hset).toHaveBeenCalledWith('ftp:' + userId, ftpId, JSON.stringify(ftp));
    expect(redis.sadd).toHaveBeenCalledWith('connections:' + userId, ftpId);
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