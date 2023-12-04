import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { userKeyPrefix } from "@/util/keys"
import type { EncryptedConnection } from "@/types"

type PostRequest = {
  userId: string
  createdAt: number
  connectionId: string
  encrypted: string
  key: string
  iv: string
}

const redis = Redis.fromEnv()

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId

  if (!userId) {
    return NextResponse.json(
      {
        error: "userId is required",
        description: `Error while saving connection`,
      },
      { status: 400 }
    )
  }

  // reads json body and types it as the type previously defined
  const { createdAt, connectionId, encrypted, key, iv } = (await req.json()) as PostRequest

  const userPoolKey = userKeyPrefix + userId + ":connections"

  // create transaction - multiple commands
  const tx = redis.multi()

  // Saves encrypted FTP data to hash set at lazyftp:[key] -> lazyftp::4XtW84JAENtccmVo4z2q9U
  // Adding item to set at lazyftp:user:[userID]:ftp -> lazyftp:user:994f04ef-3976-4181-ba9f-4d7c9a7885f6:ftp
  // const itemKey = ["lazyftp", connectionId].join(":")
  // tx.hset(itemKey, { id: connectionId, encrypted, key, iv })

  // Adds item to sorted set at lazyftp:user:[userID]:ftp -> lazyftp:user:994f04ef-3976-4181-ba9f-4d7c9a7885f6:ftp
  // with score of current time
  const item = { id: connectionId, createdAt, encrypted, key, iv }
  tx.zadd(userPoolKey, { score: createdAt, member: item })

  const createdMetricsKey = ["lazyftp", "metrics", "connections", "writes"].join(":")
  tx.incr(createdMetricsKey)

  const res = await tx.exec<[number, number]>()

  if (res.includes(0)) {
    return NextResponse.json({
      status: 500,
      error: "Failed to save connection",
    })
  } else {
    return NextResponse.json({ status: 200, msg: "FTP connection saved", key })
  }
}



// Lua script to get all connections of a user
// ARGV[1] is the userPoolKey (lazyftp:user:[userID]:connections)
// const script = `
//   local connections = {};
//   local keys = redis.call('zrange', ARGV[1], 0, -1);

//   if keys[1] == nil then
//     return { false };
//   else
//     for i, key in ipairs(keys) do
//       connections[i] = redis.call('hgetall', "lazyftp:" .. key);
//     end
//     redis.call('INCRBY', "lazyftp:metrics:connections:reads", #keys);
//     return connections;
//   end
// `

// const res: string[][] = await redis.eval(
//   script,
//   [userPoolKey],
//   [userPoolKey]
// )

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId

  if (!userId) {
    return NextResponse.json(
      {
        error: "userId is required",
        description: `Error while fetching connection`,
      },
      { status: 400 }
    )
  }

  // lazyftp:user:[userID]:connections
  const userPoolKey = userKeyPrefix + userId + ":connections"

  const res = await redis.zrange(userPoolKey, 0, -1)

  if (!res.length) {
    return NextResponse.json({ status: 500, error: "Failed to get connections" })
  } else if (res[0] === null) {
    return NextResponse.json({ status: 404, error: "User has no connections available" })
  } else {

    return NextResponse.json({ status: 200, encryptedConnections: res })
  }
}


export async function DELETE(
  req: NextRequest,
) {
  const { userId, createdAt }= await req.json()

  if (!userId || !createdAt) {
    return NextResponse.json(
      {
        error: "userId and createdAt are required to delete a connection",
        description: `Error while deleting connection`,
      },
      { status: 400 }
    )
  }

  // lazyftp:user:[userID]:connections
  const userPoolKey = userKeyPrefix + userId + ":connections"

  const res = await redis.zremrangebyscore(userPoolKey, createdAt, createdAt)

  if (!res || res === 0) {
    return NextResponse.json({ error: "Connection not found" }, { status: 404 })
  } else if (res > 1) {
    return NextResponse.json({error: "Deleted more than one connection" }, { status: 500 })
  } else {
    return NextResponse.json(res)
  }
}