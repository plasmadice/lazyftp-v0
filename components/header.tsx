import Link from "next/link"

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-base-300 bg-base-300">
      <Link href="/api/auth/signout">
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
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
        <span className="sr-only">FTP Service</span>
      </Link>
      <Link
        className="text-sm font-medium text-base-content"
        href="/faq"
      >
        FAQ
      </Link>
    </header>
  )
}
