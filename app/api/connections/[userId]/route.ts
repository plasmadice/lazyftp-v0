import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { userKeyPrefix } from "@/util/keys"

type Request = {
  userId: string
  connectionId: string
  encrypted: string
  key: string
  iv: string
}

const redis = Redis.fromEnv()

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
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
  const { connectionId, encrypted, key, iv } = (await req.json()) as Request

  const userPoolKey = userKeyPrefix + userId + ":connections"

  const now = Date.now()

  // create transaction - multiple commands
  const tx = redis.multi();

  // Saves encrypted FTP data to hash set at lazyftp:[key] -> lazyftp::4XtW84JAENtccmVo4z2q9U
  // Adding item to set at lazyftp:user:[userID]:ftp -> lazyftp:user:994f04ef-3976-4181-ba9f-4d7c9a7885f6:ftp
  const itemKey = ["lazyftp", connectionId].join(':')
  tx.hset(itemKey, { encrypted, key, iv })

  // Adds item to sorted set at lazyftp:user:[userID]:ftp -> lazyftp:user:994f04ef-3976-4181-ba9f-4d7c9a7885f6:ftp
  // with score of current time
  tx.zadd(userPoolKey, {score: now, member: connectionId})

  const createdMetricsKey = ["lazyftp", "metrics", "created"].join(':')
  tx.incr(createdMetricsKey)

  const res = await tx.exec<[number, number, number]>()

  if (process.env.NODE_ENV === 'development') {
    console.log(`Saved encrypted FTP data to ${itemKey}`)
    console.log(`Adding item to ${userPoolKey}`)
  }

  if (res.includes(0)) {
    return NextResponse.json(
      { status: 500, error: "Failed to save FTP connection" }
    )
  } else {
    return NextResponse.json(
      { status: 200, msg: "FTP connection saved", key },
    )
  }
}

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
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

  const userPoolKey = userKeyPrefix + userId + ":connections"
  // const data = await redis.hmget(keys, )

  // return {keys, data}
  const script = `
    local connections = {};
    local keys = redis.call('zrange', ARGV[1], 0, -1);
    for i, key in ipairs(keys) do
      connections[i] = redis.call('hgetall', "lazyftp:" .. key);
    end
    return connections;
  `
  const connections = await redis.eval(script, [userPoolKey], [userPoolKey])
  console.log('connections in get connections', connections)

  // const connections = await redis.eval(script, keys, keys)

  // console.log('keys in get connections', keys)

  // console.log('connections in get connections', connections)

  if (false) {
    return NextResponse.json(
      { status: 500, error: "Failed to get connections" }
    )

  } else {
    return NextResponse.json(
      { status: 200 },
    )
  }
}