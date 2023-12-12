"use server"
import { z } from "zod"
import { Redis } from "@upstash/redis"
import { encrypt } from "@/pkg/encryption"
import { userKeyPrefix, createdMetricsKey, readMetricsKey } from "@/util/keys"
import type { Connection } from "@/types"
import { generateId } from "@/pkg/id"
import { toBase58 } from "@/util/base58"
import { revalidatePath } from "next/cache"

import { auth } from "@/util/auth"

type SaveActionResult =
  | { type: "success"; message: string }
  | { type: "error"; errors: Record<string, string[] | undefined> }
  | { type: undefined; message: null }

const saveSchema = z.object({
  // url: z.string().optional(),
  type: z.enum(["ftp", "ftps", "http"]),
  name: z.string().optional(),
  host: z
    .string()
    .includes(".")
    .min(3, { message: "host must be a valid IP address or hostname" }),
  username: z.string().optional(),
  password: z.string().optional(),
  port: z.coerce.number().nonnegative().optional(),
  secure: z.coerce.boolean().optional(),
})

// pattern https://github.com/vercel/next.js/discussions/49426#discussioncomment-7138371
export async function saveConnectionAction(
  prevState: SaveActionResult,
  payload: FormData
) {
  console.log('called saveConnectionAction')
  // return { type: "success" as const, message: "Connection saved successfully." } satisfies SaveActionResult
  const session = await auth()

  const parse = saveSchema.safeParse({
    type: payload.get("type"),
    name: payload.get("name"),
    host: payload.get("host"),
    username: payload.get("username"),
    password: payload.get("password"),
    port: Number(payload.get("port")),
    secure: Boolean(payload.get("secure")),
  })

  console.log('parse in saveConnectionAction', parse)

  // Only fail if data failed to parse
  if (parse.success) {
    console.log("parse", parse)
    const id = generateId()
    const now = Date.now()
    const connection: Connection = {
      ...parse.data,
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

    const redis = Redis.fromEnv()
    const tx = redis.multi()

    const userPoolKey = userKeyPrefix + session?.user.id + ":connections"
    tx.zadd(userPoolKey, { score: now, member: item })
    tx.incr(createdMetricsKey)

    await tx.exec()

    revalidatePath("/connections")
    return { type: "success" as const, message: "Connection saved successfully.", } satisfies SaveActionResult
  } else {
    console.log("parse", parse)
    return !parse.success ? ({ type: "error" as const, errors: parse.error.flatten().fieldErrors, } satisfies SaveActionResult) : ({ type: undefined, message: null } satisfies SaveActionResult)
  }
}

// pattern https://github.com/vercel/next.js/discussions/49426#discussioncomment-7138371
export async function saveAction(
  prevState: SaveActionResult,
  payload: z.infer<typeof saveSchema>
) {
  // return { type: "success" as const, message: "Connection saved successfully." } satisfies SaveActionResult
  const session = await auth()

  const parse = saveSchema.safeParse(payload)

  // Only fail if data failed to parse
  if (parse.success) {
    const id = generateId()
    const now = Date.now()
    const connection: Connection = {
      ...parse.data,
      id,
      createdAt: now,
      lastAccessed: now,
    }

    if (!parse.data.name) {
      // Show first 2 letters of host as name if name is not provided
      connection.name = parse.data.host.slice(0, 2) + "..."
    }

    const { encrypted, iv, key } = await encrypt(JSON.stringify(connection))
    const item = {
      id: connection.id,
      createdAt: now,
      encrypted: toBase58(encrypted),
      key: toBase58(key),
      iv: toBase58(iv),
    }

    const redis = Redis.fromEnv()
    const tx = redis.multi()

    const userPoolKey = userKeyPrefix + session?.user.id + ":connections"
    tx.zadd(userPoolKey, { score: now, member: item })
    tx.incr(createdMetricsKey)

    await tx.exec()

    revalidatePath("/connections")
    return { type: "success" as const, message: id } satisfies SaveActionResult
  } else {
    return !parse.success ? ({ type: "error" as const, errors: parse.error.flatten().fieldErrors } satisfies SaveActionResult) : ({ type: undefined, message: null } satisfies SaveActionResult)
  }
}

export async function getAction(score: number): Promise<Connection | null> {
  const session = await auth()
  // retrieve details of specific connection from Redis
  const redis = Redis.fromEnv()
  const tx = redis.multi()

  const userPoolKey = userKeyPrefix + session?.user.id + ":connections"
  tx.zrange(userPoolKey, score, score)
  tx.incr(readMetricsKey)
  
  const [res, _] = await tx.exec()

  console.log('res in getAction', res)
  return res
}