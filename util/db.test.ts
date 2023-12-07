import { describe, it, expect } from "@jest/globals";
import { setConnection, deleteConnection } from './db';
import { mockFTPConnection } from '@/app/connections/new/MockFTP';

const userId = crypto.randomUUID()
const connectionId = crypto.randomUUID()

describe('FTP functions', () => {
  mockFTPConnection.id = connectionId;
  it('sets an FTP session', async () => {
    let res = await setConnection(userId, mockFTPConnection);
    expect(res).toBeInstanceOf(String);
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