import { SignIn } from '@clerk/react'
import { createFileRoute } from '@tanstack/react-router'

const SignInPage = () => (
  <div className="flex justify-center py-12">
    <SignIn />
  </div>
)

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})
