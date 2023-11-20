// NOT CURRENTLY WORKING

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import * as ftp from "basic-ftp"
import Cryptr from "cryptr"

export async function POST(request: Request) {
  // const session = await getServerSession(req, res, authOptions)
  const { server, path } = await request.json() // server string - encrypted

  // decrypt results
  const cryptr = new Cryptr(process.env.ENCRYPT_KEY as string)
  const decrypted = JSON.parse(cryptr.decrypt(server))

  const { host, port, user, password } = decrypted

  console.log(`path: ${path}, host: ${host}, port: ${port}, user: ${user}, password: ${password}`)
  if (!host || !user || !password || !path) {
    return NextResponse.json(
      {
        error: "Insufficient parameters",
        description: `Issue with data sent to server.`,
      },
      { status: 400 }
    )
  }

  try {
    const client = new ftp.Client()

    await client.access({
      host,
      port,
      user,
      password,
      secure: true,
    })

    // client.lastAccessed = new Date().getTime()

    // clients[ftpHost + ftpUser] = client

    const list = await client.list(path)

    return NextResponse.json(list)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        // description: `Error while searching: ${query}`,
      },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  return NextResponse.json(
    {
      error: "Not Implemented",
      description: `Use POST method to access this route.`,
    },
    { status: 501 }
  )
}