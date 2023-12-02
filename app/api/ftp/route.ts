import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { userKeyPrefix } from "@/util/keys"

type Request = {
  host: string
  userId: string
  connectionId: string
  encrypted: string
  key: string
  iv: string
}

const redis = Redis.fromEnv()

export async function POST(req: NextRequest) {
  // reads json body and types it as the type previously defined
  const { userId, connectionId, encrypted, key, iv } = (await req.json()) as Request
  const userFTPPool = userKeyPrefix + userId + ":ftp"

  const now = Date.now()

  // create transaction - multiple commands
  const tx = redis.multi();

  // Saves encrypted FTP data to hash set at lazyftp:[key] -> lazyftp::4XtW84JAENtccmVo4z2q9U
  // Adding item to set at lazyftp:user:[userID]:ftp -> lazyftp:user:994f04ef-3976-4181-ba9f-4d7c9a7885f6:ftp
  const itemKey = ["lazyftp", connectionId].join(':')
  tx.hset(itemKey, { encrypted, key, iv })

  // Adds item to sorted set at lazyftp:user:[userID]:ftp -> lazyftp:user:994f04ef-3976-4181-ba9f-4d7c9a7885f6:ftp
  // with score of current time
  tx.zadd(userFTPPool, {score: now, member: connectionId})

  const createdMetricsKey = ["lazyftp", "metrics", "created"].join(':')
  tx.incr(createdMetricsKey)

  const res = await tx.exec<[number, number, number]>()

  if (process.env.NODE_ENV === 'development') {
    console.log(`Saved encrypted FTP data to ${itemKey}`)
    console.log(`Adding item to ${userFTPPool}`)
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json(
      {
        error: "id is required",
        description: `Error while fetching connection`,
      },
      { status: 400 }
    )
  }

  // const reqBody = await req.json()
  // console.log('reqBody:', reqBody)
  // const { userId, key } = (await req.json()) as { userId: string, key: string }
  // const userFTPPool = userKeyPrefix + userId + ":ftp"

  // const tx = redis.multi()

  // const itemKey = ["lazyftp", key].join(':')
  // tx.hgetall(itemKey)

  // const res = await tx.exec<[number, number, number]>()

  if (false) {
    return NextResponse.json(
      { status: 500, error: "Failed to get FTP connection" }
    )

  } else {
    return NextResponse.json(
      { status: 200, msg: "FTP connection retrieved", ftp: null },
    )
  }
}