import type { User, Session } from 'next-auth'

export type Payload = {
  host: string
  user: string
  password: string
  path: string
  port: number
}

export type Server = {
  host: string | undefined
  port?: number | undefined
  user?: string
  password?: string
  passkey?: string
}

export type Options = {
  path: string
  host: string
  port: number | undefined
  user: string | undefined
  password: string | undefined
}

// Before asking copilot
// export interface FTPSession extends Session {
//   server?: string
// }

export interface FTPSession {
  id: string;
  name?: string;
  host: string;
  username?: string;
  password?: string;
  port?: number;
  secure?: boolean;
  lastAccessed: number;
}