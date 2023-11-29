import { LoginForm } from '@/components/login-form'
import { Main } from "@/components/main"

import { auth } from "@/util/auth"

export default async function Page() {
  const session = await auth()

  if (session) {
    return <Main />
  } else {
    return <LoginForm />
  }
}
