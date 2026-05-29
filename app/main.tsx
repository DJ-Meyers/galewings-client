import { ClerkProvider, useAuth } from '@clerk/react'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import { getRouter } from '~/router'

const router = getRouter()

const App = () => {
  const auth = useAuth()

  useEffect(() => {
    if (auth.isLoaded) {
      void router.invalidate()
    }
  }, [auth.isLoaded, auth.isSignedIn])

  if (!auth.isLoaded) return null

  return <RouterProvider router={router} context={{ auth }} />
}

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/teams"
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
