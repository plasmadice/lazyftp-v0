/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IKNPAK45sgU
 */
import { Providers } from "@/components/providers"
import Link from "next/link"

export function LoginForm() {

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        // recommended background: https://www.vantajs.com/?effect=net
        backgroundImage: '"url("/placeholder.svg?height=1080&width=1920")"',
      }}
    >
      <div className="flex flex-col w-full max-w-lg mx-12 px-8 py-12 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 md:px-12 lg:px-14 md:space-x-8">
        <div className="flex flex-col justify-between space-y-6 mb-8 md:mb-0">
          <h1 className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white whitespace-nowrap">
            View Your Accounts
          </h1>
          <Providers />
          <Link className="text-blue-500 hover:underline whitespace-nowrap" href="/demo">
            Continue without logging in
          </Link>
        </div>
      </div>
    </div>
  )
}

