/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Lz4niCeKpGf
 */
import type { Connection } from "@/types"
import { ConnectionItem } from "@/components/connection/connection-item"

export function ConnectionList({
  userId,
  connections,
}: {
  userId: string
  connections: Connection[]
}) {
  return (
    <div className="flex flex-col pt-4 text-base-content">

      <div className="flex flex-col gap-4 py-2 border-b last:border-b-0">
        {connections.map((connection) => (
          <ConnectionItem
            key={connection.id}
            userId={userId}
            connection={connection}
          />
        ))}
      </div>
    </div>
  )
}