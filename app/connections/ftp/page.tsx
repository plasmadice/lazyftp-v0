import { auth } from "@/util/auth"
import { AddFTP } from "@/components/add-ftp"

export default async function page() {
  const session = await auth()
  const userId = session?.user?.id

  if (session?.user) {
    console.log('retrieving FTP connections')

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ftp/get`)

    return (
      <main className="flex-grow place-self-center bg-base-100">
        <AddFTP />
      </main>
    )
  }
}
