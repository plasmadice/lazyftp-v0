import { AddFTP } from "@/components/add-ftp"

export default async function page() {
  console.log("retrieving FTP connections")

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ftp/get`)

  return <AddFTP />
}
