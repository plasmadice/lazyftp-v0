import { FileView } from "@/components/file-view"
import { auth } from "@/util/auth"
import type { Session } from "next-auth"
import Link from "next/link"

export async function Main() {
  const session: Session | null = await auth()

  if (session) {
    return (
      <>
        <p>Logged in</p>
        <p>User: {session.user.name}</p>
        <p>ID: {session.user.id}</p>
        <Link href="/connections" className="link link-secondary">
          Connections
        </Link>
      </>
    )
  } else {
    return (
      <>
        <p>Not logged in</p>
      </>
    )
  }
}
