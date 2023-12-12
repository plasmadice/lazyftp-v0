import { defaultOptions } from '@auth/upstash-redis-adapter'

const baseKeyPrefix = "lazyftp:"
const accountKeyPrefix = baseKeyPrefix + defaultOptions.accountKeyPrefix
const accountByUserIdPrefix =
  baseKeyPrefix + defaultOptions.accountByUserIdPrefix
const emailKeyPrefix = baseKeyPrefix + defaultOptions.emailKeyPrefix
const sessionKeyPrefix = baseKeyPrefix + defaultOptions.sessionKeyPrefix
const sessionByUserIdKeyPrefix =
  baseKeyPrefix + defaultOptions.sessionByUserIdKeyPrefix
const userKeyPrefix = baseKeyPrefix + defaultOptions.userKeyPrefix
const verificationTokenKeyPrefix =
  baseKeyPrefix + defaultOptions.verificationTokenKeyPrefix

const createdMetricsKey = [ "lazyftp", "metrics", "connections", "writes", ].join(":") 
const readMetricsKey = [ "lazyftp", "metrics", "connections", "reads", ].join(":")
const editMetricsKey = [ "lazyftp", "metrics", "connections", "edits", ].join(":")

export { baseKeyPrefix, accountKeyPrefix, accountByUserIdPrefix, emailKeyPrefix, sessionKeyPrefix, sessionByUserIdKeyPrefix, userKeyPrefix, verificationTokenKeyPrefix, createdMetricsKey, readMetricsKey, editMetricsKey  }