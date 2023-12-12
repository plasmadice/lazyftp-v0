import type { Connection } from "@/types"
import { ConnectionButtons } from "@/components/connection/connection-buttons"

export function ConnectionItem({
  userId,
  connection,
}: {
  userId: string
  connection: Connection
}) {
  const {
    id,
    name,
    type,
    createdAt,
    lastAccessed,
    history = [{ path: "/path/to/loot" }],
  } = connection

  const latestPath = history && history[0] ? history[0].path : "/path/to/loot"

  return (
    <div className="p-4 flex justify-between items-start odd:bg-base-300 rounded-lg">
      <div>
        <div className="font-medium truncate">
          <span>{name}</span>
          <span className="font-light text-sm ml-2">(id: {id})</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-thin truncate">
            Created: {new Date(createdAt).toLocaleString()}
          </div>
          <div className="text-sm truncate">
            Type: {type}, Last accessed:{" "}
            {lastAccessed && new Date(lastAccessed).toLocaleString()}, Last
            connected path: {latestPath}
          </div>
        </div>
      </div>
      <ConnectionButtons userId={userId} createdAt={connection.createdAt} />
    </div>
  )
}
