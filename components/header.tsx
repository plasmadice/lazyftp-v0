import Link from "next/link"

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b dark:border-zinc-800 bg-yellow-200">
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
        href="/faq"
      >
        FAQ
      </Link>
    </header>
  )
}
