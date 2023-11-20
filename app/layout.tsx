import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Collapsible } from "@/components/ui/collapsible"
import { Header } from "@/components/header"
import { Aside } from "@/components/aside"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LazyFTP v0",
  description: "LazyFTP v0 remake",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="min-h-screen flex flex-col gap-2 bg-base-300">
          <Header />
          <Collapsible
            // defaultOpen
            className="flex-grow flex overflow-auto min-h-full"
          >
            <Aside />
            {children}
          </Collapsible>
          <Footer />
        </section>
      </body>
    </html>
  )
}
