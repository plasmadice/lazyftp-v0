"use client"

import { Button } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react"
import Link from "next/link"

export function Providers() {
  return (
    <>
      <Button
        className="w-full whitespace-nowrap bg-red-500 text-white"
        variant="outline"
        onClick={() => signIn("google", { callbackUrl: "/demo" })}
      >
        Continue with Google
      </Button>
      <Link href="/demo">
        <Button
          className="w-full whitespace-nowrap bg-blue-600 text-white"
          variant="outline"
        >
          Demo Page
        </Button>
      </Link>
      <Button
        className="w-full whitespace-nowrap bg-black text-white"
        variant="outline"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </>
  )
}
