import type { Connection } from "@/types"
import { encrypt } from "@/pkg/encryption"
import { toBase58 } from "@/util/base58"
import { generateId } from "@/pkg/id"

export const setFTP = async (userId: string, connection: Connection) => {
  connection.id = generateId()

  const { encrypted, iv, key } = await encrypt(JSON.stringify(connection))

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/connections/${userId}`, {
    method: "POST",
    body: JSON.stringify({
      encrypted: toBase58(encrypted),
      iv: toBase58(iv),
      key: toBase58(key),
      connectionId: connection.id,
    }),
  })

  const { key: ftpKey, error } = await res.json()

  if (error) {
    console.error('error in MockFTP.tsx:', error)
  }

  return ftpKey
}

// export const getFTP = async (userId: string, key: string) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ftp`, {
//     method: "GET",
//     body: JSON.stringify({ userId, key }),
//   })

//   const { encrypted, iv, error } = await res.json()

//   if (error) {
//     console.error('error in MockFTP.tsx', error)
//   }

//   return { encrypted, iv }
// }

// export const getAllFTP = async (userId: string) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ftp`, {
//     method: "GET",
//     body: JSON.stringify({ userId }),
//   })

//   const { ftp, error } = await res.json()

//   if (error) {
//     console.error('error in MockFTP.tsx', error)
//   }

//   return ftp
// }