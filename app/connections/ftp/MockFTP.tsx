"use client"
import Link from "next/link"
import { encrypt } from "@/pkg/encryption"

import { Connection } from '@/types'
import { toBase58 } from "@/util/base58"
import { auth } from "@/util/auth"

const mockFTP: Connection = {
  id: "demo-sample-ftp",
  host: "test.rebex.net/",
  username: "demo",
  password: "password",
  port: 21,
  secure: false,
  lastAccessed: Date.now(),
  createdAt: Date.now(),
}

const setFTP = async (userId: string, connection: Connection) => {
  const { encrypted, iv, key } = await encrypt(JSON.stringify(connection))

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ftp/create`, {
    method: "POST",
    body: JSON.stringify({
      encrypted: toBase58(encrypted),
      iv: toBase58(iv),
      key: toBase58(key),
      userId
    }),
  })

  const { msg, key: ftpKey, error } = await res.json()
  if (!error) {
    console.log(msg, ftpKey)
  } else {
    // parse error
    console.error(error)
  }

  return ftpKey
}

export default function MockFTP({ userId }: { userId: string }) {

  return (
    <Link
      href="#"
      className="link link-secondary ml-4"
      onClick={() => setFTP(userId, mockFTP)}
    >
      Add Mock Connection
    </Link>
  )
}
