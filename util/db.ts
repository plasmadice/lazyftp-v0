import type { Connection } from "@/types"
import { encrypt } from "@/pkg/encryption"
import { toBase58 } from "@/util/base58"
import { generateId } from "@/pkg/id"

export const setConnection = async (userId: string, connection: Connection) => {
  const id = generateId()

  const { encrypted, iv, key } = await encrypt(JSON.stringify(connection))

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/connections/${userId}`, {
    method: "POST",
    body: JSON.stringify({
      id,
      encrypted: toBase58(encrypted),
      iv: toBase58(iv),
      key: toBase58(key),
      createdAt: connection.createdAt
    }),
  })

  const { key: connectionIdKey, error } = await res.json()

  if (error) {
    console.error('Error when adding connection to database', error)
  }

  return connectionIdKey
}

export const deleteConnection = async (userId: string, createdAt: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/connections/${userId}`, {
    method: "DELETE",
    body: JSON.stringify({ userId, createdAt }),
  })

  const { error } = await res.json()

  if (error) {
    console.error('Error when deleting connection from database:', error)
  }
  return error
}