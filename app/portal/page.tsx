import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { FTPSession } from "@types"
import { formatDate } from "@utils"

const navigate = async (server: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/navigate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      server,
      path: "/",
    }),
  })

  const data = await res.json()

  return data
}

export default async function page() {
  const session: FTPSession | null = await getServerSession(authOptions)

  const data = await navigate(session?.server as string)

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">
        <Link href="/">FTP Server</Link>
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Last Modified</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.size}</td>
                <td>{item.rawModifiedAt}</td>
                <td>
                  <Link href={`/file/${item.name}`}>Open</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
