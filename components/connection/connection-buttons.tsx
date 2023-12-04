"use client"

import { Button } from "@/components/ui/button"
import { deleteConnection } from "@/util/db"
import { useRouter } from "next/navigation"

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
        className="hover:bg-success hover:text-success-content text-md"
      >
        Connect
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="hover:bg-primary hover:text-primary-content text-md"
      >
        Continue
      </Button>
      <Button
        onClick={() => {
          deleteConnection(userId, createdAt)
          router.refresh()
        }}
        size="sm"
        variant="outline"
        className="hover:bg-error hover:text-error-content font-semibold text-md"
      >
        Delete
      </Button>
    </div>
  )
}
