"use client"

import { Button } from "@/components/ui/button"
import { deleteConnection } from "@/util/db"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export const ConnectionButtons = ({
  userId,
  createdAt,
}: {
  userId: string
  createdAt: number
}) => {
  const router = useRouter()
  return (
    <div className="flex flex-row gap-2">
      <Button
        size="sm"
        variant="outline"
        className="hover:bg-primary hover:text-primary-content hover:border-primary-content font-semibold text-md"
      >
        Connect
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="hover:bg-secondary hover:text-secondary-content hover:border-secondary-content font-semibold text-md"
      >
        Continue
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="hover:bg-accent hover:text-accent-content hover:border-accent-content font-semibold text-md"
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          deleteConnection(userId, createdAt)
          router.refresh()
          toast({ description: "Connection deleted" })
        }}
        size="sm"
        variant="outline"
        className="hover:bg-error hover:text-error-content hover:border-error-content font-semibold text-md"
      >
        Delete
      </Button>
    </div>
  )
}
