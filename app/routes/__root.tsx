import { ClerkProvider } from '@clerk/react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

import '~/index.css'

const RootComponent = () => (
  <ClerkProvider
    publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    signInFallbackRedirectUrl="/teams"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  </ClerkProvider>
)

export const Route = createRootRoute({
  component: RootComponent,
})
