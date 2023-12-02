import { Connections } from "@/components/connections"
import { auth } from "@/util/auth"
import type { Session } from "next-auth"
import Link from "next/link"
import MockFTP from "@/app/connections/ftp/MockFTP"

export default async function page() {
  const session: Session | null = await auth()
  console.log('userId in connections/page.tsx', session?.user?.id)

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/connections/${session?.user?.id}`)

  const { keys } = await res.json()

  if (!session) {
    return <p>No session</p>
  } else {
    return (
      <>
        <div className="text-base-content">
          <p>Connections for {session.user.name} / {session.user.id}</p>
          <p>FTP Connections</p>
          <p>Current list of connections here</p>
        </div>
        <Link href="/connections/ftp" className="link link-secondary">
          Add New FTP Connection
        </Link>
        <MockFTP userId={session.user.id} />
        <Connections keys={keys} />
      </>
    )
  }
}
