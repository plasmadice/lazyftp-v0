"use client"
import Link from "next/link"
import { Connection } from '@/types'
import { setConnection } from "@/util/db"

export let mockFTPConnection: Connection = {
  id: 'temp-id',
  lastAccessed: Date.now(),
  createdAt: Date.now(),
  type: "ftp",
  name: "Mock FTP Connection",
  host: "test.rebex.net/",
  username: "demo",
  password: "password",
  port: 21,
  secure: false,
  history: []
}

export default function MockFTP({ userId }: { userId: string }) {

  return (
    <Link
      href="#"
      className="link link-secondary ml-4"
      onClick={() => {
        const now = Date.now()
        mockFTPConnection.createdAt = now
        mockFTPConnection.lastAccessed = now
        return setConnection(userId, mockFTPConnection)
      }}
    >
      Add Mock Connection
    </Link>
  )
}
