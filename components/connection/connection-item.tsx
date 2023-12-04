import type { Connection } from "@/types"
import { ConnectionButtons } from "@/components/connection/connection-buttons"

export function ConnectionItem({ userId, connection }: { userId: string, connection: Connection }) {
  const {
    name,
    type,
    createdAt,
    lastAccessed,
    history = [{ path: "/path/to/loot" }],
  } = connection

  const latestPath = history && history[0] ? history[0].path : "/path/to/loot"

  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="font-medium truncate">{name}</div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-zinc-600 dark:text-zinc-500 truncate">
            {createdAt}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
            Type: { type },
            Last accessed: {lastAccessed && new Date(lastAccessed).toLocaleDateString()}, Last
            connected path: {latestPath}
          </div>
        </div>
      </div>
      <ConnectionButtons userId={userId} createdAt={connection.createdAt} />
    </div>
  )
}