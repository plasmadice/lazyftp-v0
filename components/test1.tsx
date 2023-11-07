/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/mx0ur3fDgAg
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"

export function Test1() {
  return (
    <section className="h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 py-2 border-b dark:border-zinc-800">
        <Link href="#">
          <svg
            className=" h-6 w-6"
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          </svg>
          <span className="sr-only">FTP Service</span>
        </Link>
        <Link
          className="text-sm font-medium text-zinc-900 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-200"
          href="#"
        >
          FAQ
        </Link>
      </header>
      <div className="flex-grow flex overflow-hidden">
        <Sheet className="w-64 flex-shrink-0 border-r dark:border-zinc-800" side="left">
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline">
              <svg
                className=" h-6 w-6"
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
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="overflow-y-auto">
              <h3 className="px-4 py-2 text-sm font-semibold border-b dark:border-zinc-800">URL History</h3>
              <div className="px-4 py-2 border-b dark:border-zinc-800">
                <a
                  className="text-sm text-zinc-900 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-200"
                  href="#"
                >
                  ftp://example.com
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <main className="flex-grow" />
      </div>
      <Collapsible className="border-t dark:border-zinc-800">
        <CollapsibleTrigger asChild>
          <Button className="w-full h-10 flex items-center justify-between px-4" size="icon" variant="outline">
            <span>Transfers</span>
            <svg
              className=" h-6 w-6"
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
              <path d="m18 15-6-6-6 6" />
            </svg>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="overflow-y-auto">
            <h3 className="px-4 py-2 text-sm font-semibold border-b dark:border-zinc-800">Ongoing Transfers</h3>
            <div className="px-4 py-2 border-b dark:border-zinc-800">
              <p className="text-sm">Transfer to ftp://example.com at 1.5 MB/s</p>
            </div>
            <h3 className="px-4 py-2 text-sm font-semibold border-b dark:border-zinc-800">Previous Transfers</h3>
            <div className="px-4 py-2 border-b dark:border-zinc-800">
              <p className="text-sm">Transfer to ftp://example.com completed</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  )
}