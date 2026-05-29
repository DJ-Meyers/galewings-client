import { SignUp } from '@clerk/react'
import { createFileRoute } from '@tanstack/react-router'

const SignUpPage = () => (
  <div className="flex justify-center py-12">
    <SignUp />
  </div>
)

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
})
