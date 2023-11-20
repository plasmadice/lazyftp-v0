import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

import { Button } from "@/components/ui/button"

import { SheetContent, Sheet } from "@/components/ui/sheet"

export function Aside() {
  return (
    <>
      <CollapsibleContent className="w-64 flex-shrink-0 border-r dark:border-zinc-800 bg-base-200 lg:open">
        <Collapsible defaultOpen
        >
          <CollapsibleTrigger asChild>
            <Button
              className="w-full h-10 flex items-center justify-between px-4"
              size="icon"
              variant="outline"
            >
              <span>History</span>
              <svg
                className="h-6 w-6"
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
                Dummy Title 1
              </h3>
              <p className="px-4 py-2 border-b dark:border-zinc-800">
                Dummy Data 1
              </p>
              {/* Sheets are not working correctly https://ui.shadcn.com/docs/components/sheet */}
              <Sheet
                // @ts-ignore
                className="w-64 flex-shrink-0 border-r dark:border-zinc-800 bg-blue-200"
                side="left"
              >
                <SheetContent>
                  <div className="overflow-y-auto">
                    <h3 className="px-4 py-2 text-sm font-semibold border-b dark:border-zinc-800">
                      URL History
                    </h3>
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
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button
              className="w-full h-10 flex items-center justify-between px-4"
              size="icon"
              variant="outline"
            >
              <span>History</span>
              <svg
                className="h-6 w-6"
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
                Dummy Title 1
              </h3>
              <p className="px-4 py-2 border-b dark:border-zinc-800">
                Dummy Data 1
              </p>
              {/* Sheets are not working correctly https://ui.shadcn.com/docs/components/sheet */}
              <Sheet
                // @ts-ignore
                className="w-64 flex-shrink-0 border-r dark:border-zinc-800 bg-blue-200"
                side="left"
              >
                <SheetContent>
                  <div className="overflow-y-auto">
                    <h3 className="px-4 py-2 text-sm font-semibold border-b dark:border-zinc-800">
                      URL History
                    </h3>
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
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>

      <CollapsibleTrigger className="min-h-full" asChild>
        <button className="w-max min-h-full flex items-center justify-between">
          <svg
            className="h-6 w-6 transform -rotate-90" // Added transform rotate-90
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
        </button>
      </CollapsibleTrigger>
    </>
  )
}
