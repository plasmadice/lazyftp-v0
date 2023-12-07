"use server"
import { z } from "zod"
import { Redis } from "@upstash/redis"
import { encrypt } from "@/pkg/encryption"
import { userKeyPrefix, createdMetricsKey } from "@/util/keys"
import type { Connection } from "@/types"
import { generateId } from "@/pkg/id"
import { auth } from "@/util/auth"
import { toBase58 } from "@/util/base58"
import { revalidatePath } from "next/cache"

export async function createConnection(prevState: any, formData: FormData) {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized")
  }

  const connectionSchema = z.object({
    type: z.string(),
    name: z.string().optional(),
    host: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    port: z.number().default(21).optional(),
    secure: z.boolean().default(false).optional(),
  })

  const parse = connectionSchema.safeParse({
    type: formData.get("type"),
    name: formData.get("name"),
    host: formData.get("host"),
    username: formData.get("username"),
    password: formData.get("password"),
    port: Number(formData.get("port")),
    secure: Boolean(formData.get("secure")),
  })

  if (!parse.success) {
    console.error("Error parsing connection data", parse.error)
    throw new Error(parse.error.message)
  }

  const data = parse.data

  try {
    const id = generateId()
    const now = Date.now()
    const connection: Connection = {
      ...data,
      id,
      createdAt: now,
      lastAccessed: now,
    }

    const { encrypted, iv, key } = await encrypt(JSON.stringify(connection))
    const item = {
      id: connection.id,
      createdAt: now,
      encrypted: toBase58(encrypted),
      key: toBase58(key),
      iv: toBase58(iv),
    }
    // const item = { id, now, ...encrypted }
    const redis = Redis.fromEnv()
    const tx = redis.multi()

    // Adds item to sorted set at lazyftp:user:[userID]:ftp -> lazyftp:user:994f04ef-3976-4181-ba9f-4d7c9a7885f6:ftp
    // with score of current time
    const userPoolKey = userKeyPrefix + session.user.id + ":connections"
    tx.zadd(userPoolKey, { score: now, member: item })

    tx.incr(createdMetricsKey)

    const res = await tx.exec<[number, number]>()
    if (res.includes(0)) {
      throw new Error("Failed to save connection")
    }
    revalidatePath("/connections")
  } catch (e) {
    console.error("Error saving connection data", e)
  }

  return data
}
