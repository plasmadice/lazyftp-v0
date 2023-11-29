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

const baseConnectionsKeyPrefix = ':connections:'
const ftpKeyPrefix = baseConnectionsKeyPrefix + 'ftp:'

export { accountKeyPrefix, accountByUserIdPrefix, emailKeyPrefix, sessionKeyPrefix, sessionByUserIdKeyPrefix, userKeyPrefix, verificationTokenKeyPrefix, ftpKeyPrefix }