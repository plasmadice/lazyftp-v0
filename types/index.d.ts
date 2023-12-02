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


export type Connection = {
  id: string
  lastAccessed: number
  createdAt: number
  type: string
  name?: string
  host?: string
  username?: string
  password?: string
  port?: number
  secure?: boolean
  history?: HistoryEvent[]
}

export type HistoryEvent = {
  id: string
  userId: string
  timestamp: number
  command: string
  args: string[]
  path: string
}