import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function Footer() {
  return (
    <Collapsible
      defaultOpen
      className="border-t dark:border-zinc-800 bg-base-100"
    >
      <CollapsibleTrigger asChild>
        <Button
          className="w-full h-10 flex items-center justify-between px-4"
          size="icon"
          variant="outline"
        >
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
          <h3 className="px-4 py-2 text-sm font-semibold border-b dark:border-zinc-800">
            Ongoing Transfers
          </h3>
          <div className="px-4 py-2 border-b dark:border-zinc-800">
            <p className="text-sm">Transfer to ftp://example.com at 1.5 MB/s</p>
          </div>
          <h3 className="px-4 py-2 text-sm font-semibold border-b dark:border-zinc-800">
            Previous Transfers
          </h3>
          <div className="px-4 py-2 border-b dark:border-zinc-800">
            <p className="text-sm">Transfer to ftp://example.com completed</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
