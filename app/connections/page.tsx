import { ConnectionList } from "@/components/connection/connection-list"
import { auth } from "@/util/auth"
import type { Session } from "next-auth"
import Link from "next/link"
import MockFTP from "@/app/connections/ftp/MockFTP"
import { decrypt } from "@/pkg/encryption"
import { fromBase58 } from "@/util/base58"
import type { EncryptedConnection, Connection } from "@/types"

export const revalidate = 60

export default async function page() {
  const session: Session | null = await auth()

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/connections/${session?.user?.id}`)

  const { encryptedConnections = [] } = (await res.json()) as { encryptedConnections: EncryptedConnection[] }

  const decryptConnections = (items: EncryptedConnection[]) => items.map(async (connection) => {
    const decrypted: Connection = JSON.parse(await decrypt(connection.encrypted, fromBase58(connection.key), connection.iv))
    return decrypted
  })

  const connections = await Promise.all(decryptConnections(encryptedConnections))

  if (!session) {
    return <p>No session</p>
  } else {
    return (
      <div className="overflow-hidden">
        <div className="text-base-content">
          <p>Connections for {session.user.name} / {session.user.id}</p>
          <p>FTP Connections</p>
          <p>Current list of connections here</p>
        </div>
        <Link href="/connections/ftp" className="link link-secondary">
          Add New FTP Connection
        </Link>
        <MockFTP userId={session.user.id} />
        {connections.length > 0 && <ConnectionList userId={session.user.id} connections={connections} />}
      </div>
    )
  }
}
