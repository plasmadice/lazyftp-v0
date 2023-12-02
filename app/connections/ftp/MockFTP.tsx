"use client"
import Link from "next/link"
import { Connection } from '@/types'
import { setFTP } from "@/util/db"
import { generateId } from "@/pkg/id"

let mockConnection: Connection = {
  id: 'temp-id',
  lastAccessed: Date.now(),
  createdAt: Date.now(),
  type: "ftp",
  name: "Mock FTP Connection 2",
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
      onClick={() => setFTP(userId, mockConnection)}
    >
      Add Mock Connection
    </Link>
  )
}
