import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { userKeyPrefix, ftpKeyPrefix } from "@/util/keys"

type Request = {
  userId: string
  encrypted: string
  key: string
  iv: string
}

const redis = Redis.fromEnv()

export async function POST(req: NextRequest) {
  // reads json body and types it as the type previously defined
  const { userId, encrypted, key, iv } = (await req.json()) as Request
  const userFTPKey = userKeyPrefix + userId + ftpKeyPrefix + key

  // save encrypted ftp data to redis
  // lazyftp:user:aaa211de-51d5-4fb6-ba12-9f92871f6a1e:connections:ftp:PRcK1k2JebpoV6VVGQ3KqR
  const res = await redis.hset(userFTPKey, { encrypted, iv })

  if (res !== 2) {
    return NextResponse.json(
      { status: 500, error: "Failed to save FTP connection" }
    )
  } else {
    return NextResponse.json(
      { status: 200, msg: "FTP connection saved", key },
    )
  }
}
