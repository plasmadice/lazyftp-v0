import { LoginForm } from '@/components/login-form'
import { Main } from "@/components/main"

/* Server side session fetch pattern */
// import { auth } from "@/app/api/auth/[...nextauth]/route"
import { auth } from "@/util/auth"

export default async function Page() {
  const session = await auth()

  if (session) {
    return <Main />
  } else {
    return <LoginForm />
  }
}
