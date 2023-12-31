/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/WqcorAsySdV
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FileView() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">FTP Server Contents</h2>
        <div className="mt-8 grid gap-4 md:gap-6 lg:gap-8">
          <div className="grid grid-cols-[1fr,auto] gap-4 items-start bg-white rounded-lg shadow p-4 dark:bg-zinc-800">
            <div>
              <p className="font-medium">Folder Name</p>
              <svg
                className=" h-6 w-6 text-zinc-500 dark:text-zinc-400 mt-2"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
              </svg>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Last Modified: 2023-11-04 | Size: 1024 MB | Type: 1
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="flex space-x-2">
                <Button variant="outline">Open Folder</Button>
                <Button variant="secondary">Download</Button>
              </div>
              <div className="flex flex-col space-y-1 text-right">
                <Link className="text-xs text-zinc-500 dark:text-zinc-400" href="#">
                  Placeholder Link 1
                </Link>
                <Link className="text-xs text-zinc-500 dark:text-zinc-400" href="#">
                  Placeholder Link 2
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1fr,auto] gap-4 items-start bg-white rounded-lg shadow p-4 dark:bg-zinc-800">
            <div>
              <p className="font-medium">File Name</p>
              <svg
                className=" h-6 w-6 text-zinc-500 dark:text-zinc-400 mt-2"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Last Modified: 2023-11-03 | Size: 512 MB | Type: 2
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Button variant="secondary">Download</Button>
              <div className="flex flex-col space-y-1 text-right">
                <Link className="text-xs text-zinc-500 dark:text-zinc-400" href="#">
                  Placeholder Link 1
                </Link>
                <Link className="text-xs text-zinc-500 dark:text-zinc-400" href="#">
                  Placeholder Link 2
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
