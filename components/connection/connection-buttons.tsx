"use client"

import { Button } from "@/components/ui/button"
import { deleteConnection } from "@/util/db"
import { useRouter } from "next/navigation"
import { toast, useToast } from "@/components/ui/use-toast"

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
        className="bg-primary text-primary-content border-primary-content hover:bg-secondary text-md"
      >
        Connect
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="hover:bg-primary hover:text-primary-content hover:border-primary-content text-md"
      >
        Continue
      </Button>
      <Button
        onClick={() => {
          deleteConnection(userId, createdAt)
          router.refresh()
          toast({ description: "Connection deleted" })
        }}
        size="sm"
        variant="outline"
        className="bg-error text-error-content border-error-content font-semibold text-md"
      >
        Delete
      </Button>
    </div>
  )
}
