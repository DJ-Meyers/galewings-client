import { useAuth } from '@clerk/react'
import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const AuthGate = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      void navigate({ to: '/sign-in' })
    }
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return <Outlet />
}

const AuthenticatedLayout = () => {
  const developmentBypass =
    import.meta.env.DEV && import.meta.env.VITE_DEV_BYPASS_AUTH === 'true'

  if (developmentBypass) {
    return <Outlet />
  }

  return <AuthGate />
}

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})
