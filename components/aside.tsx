import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

import { Button } from "@/components/ui/button"

export function Aside() {
  return (
    <>
      {/* hide CollapsibleContent tag with className ex: lg:open */}
      <CollapsibleContent className="w-64 flex-shrink-0 bg-base-300 lg:open rounded-br-lg text-base-content">
        <Collapsible
        >
          <CollapsibleTrigger asChild>
            <Button
              className="w-full h-10 flex items-center justify-between px-4 first:rounded-none border-b border-accent"
              size="icon"
              variant="outline"
            >
              <span className="font-semibold">History 1</span>
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
              <h3 className="px-4 py-2 text-sm border-b border-base-content">
                Dummy Title 1
              </h3>
              <p className="px-4 py-2 border-b border-base-content">
                Dummy Data 1
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button
              className="w-full h-10 flex items-center justify-between px-4 first:rounded-t-none border-base-300 border-b-accent"
              size="icon"
              variant="outline"
            >
              <span className="font-semibold">History 2</span>
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
              <h3 className="px-4 py-2 text-sm border-b border-base-content">
                Dummy Title 1
              </h3>
              <p className="px-4 py-2 border-b border-base-content">
                Dummy Data 1
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>

      <CollapsibleTrigger className="min-h-full" asChild>
        <button className="w-6 min-h-full flex items-center justify-between">
          <svg
            className="h-6 w-6 transform -rotate-90 text-accent-content" // Added transform rotate-90
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
