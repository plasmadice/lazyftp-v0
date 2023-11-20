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
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Continue with Google
      </Button>
      <Button
        className="w-full whitespace-nowrap bg-[#5865F2] text-white"
        variant="outline"
        onClick={() => signIn("discord", { callbackUrl: "/" })}
      >
        Continue with Discord
      </Button>
      <Link href="/view">
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
