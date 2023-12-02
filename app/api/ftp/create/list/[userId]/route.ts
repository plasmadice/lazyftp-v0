import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { auth } from "@/util/auth"

type Request = {
  userId: string
  encrypted: string
  key: string
  iv: string
}

const redis = Redis.fromEnv()

export async function GET(req: NextRequest, res: NextResponse) {
  // reads json body and types it as the type previously defined
  const { userId } = (await req.json()) as Request


  const session = await auth()

  console.log('session in get ftp', session)

  const key = ""

  if (res.ok) {
    return NextResponse.json(
      { status: 500, error: "Failed to save FTP connection" }
    )
  } else {
    return NextResponse.json(
      { status: 200, msg: "FTP connection saved", key },
    )
  }
}
