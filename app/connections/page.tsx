import { FileView } from "@/components/file-view"
import { auth } from "@/util/auth"

import { AddFTP } from "@/components/add-ftp"

export default async function page() {
  const session = await auth()

  console.log("Session in <Main> view", session)

  if (session?.ftp) {
    return (
      <main className="flex-grow bg-base-100">
        <FileView />
      </main>
    )
  } else {
    return (
      <main className="flex-grow place-self-center bg-base-100">
        <AddFTP />
      </main>
    )
  }
}
